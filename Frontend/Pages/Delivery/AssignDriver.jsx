import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { FaLocationCrosshairs } from "react-icons/fa6";
import driv from '../../assets/images/driver1.png';
import { FaPhoneAlt } from "react-icons/fa";
import Modal from 'react-modal'; // Import Modal for popup
import { useNavigate } from 'react-router-dom'; // Add this import at the top

Modal.setAppElement('#root'); // Set the root element for accessibility

const Spinner = () => (
  <div className="flex justify-center items-center h-24">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

const vehicleIcons = {
  bike: 'https://maps.google.com/mapfiles/kml/shapes/motorcycling.png', // Example icon for bike
  car: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',   // Example icon for car
  truck: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png', // Example icon for truck
  default: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'  // Default icon
};

const AssignDriver = () => {
  const [orderLocation, setOrderLocation] = useState(null);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [progressStep, setProgressStep] = useState(0); // Progress step state
  const [movingDriverPosition, setMovingDriverPosition] = useState(null); // State for moving driver position
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [rating, setRating] = useState(0); // State to store the rating
  const [selectedDriver, setSelectedDriver] = useState(null); // Add this state
  const mapRef = useRef(null);
  const navigate = useNavigate(); // Add this line

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = { lat: 6.9271, lng: 79.8612 };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/drivers/available');
        const data = await response.json();
        console.log('Fetched Drivers:', data); // Debugging: Log the fetched drivers
        setDrivers(data);
      } catch (err) {
        console.error('Error fetching drivers:', err);
        setError("Failed to fetch available drivers.");
      }
    };
    fetchDrivers();
  }, []);

  const handleMapClick = (e) => {
    setOrderLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    setAssignedDriver(null);
    setError(null);
    setDirections(null);
    setProgressStep(0); // Reset progress
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrderLocation({ lat: latitude, lng: longitude }); // Set user's actual location
          setError(null);
          setDirections(null);
          setProgressStep(0); // Reset progress
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const simulateDriverMovement = (route) => {
    const steps = route.legs.flatMap((leg) => leg.steps); // Get all steps from the route
    const path = steps.flatMap((step) => step.path); // Extract the path (array of LatLng points)

    let index = 0;
    const interval = setInterval(() => {
      if (index < path.length) {
        setMovingDriverPosition({
          lat: path[index].lat(),
          lng: path[index].lng(),
        });
        index++;
      } else {
        clearInterval(interval); // Stop the movement when the path ends
        setProgressStep(3); // Step 3: Confirmation
        setIsModalOpen(true); // Open the modal when the vehicle reaches the destination
      }
    }, 1000); // Adjust the interval time (in milliseconds) for speed
  };

  const assignDriver = async () => {
    if (!orderLocation) {
      setError("Please select an order location on the map first.");
      return;
    }

    setIsLoading(true);
    setProgressStep(1); // Step 1: Assigning driver
    try {
      const response = await fetch('http://localhost:4000/api/assign-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderLocation)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign driver');
      }

      const data = await response.json();
      setAssignedDriver(data);
      setError(null);

      // Fetch route from Google Maps Directions API
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: data.location.lat, lng: data.location.lng }, // Driver's location
          destination: { lat: orderLocation.lat, lng: orderLocation.lng }, // User's location
          waypoints: [
            {
              location: { lat: 6.922201, lng: 79.913870 }, // Restaurant location
              stopover: true
            }
          ],
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            // Extract distance and duration
            const route = result.routes[0];
            const legs = route.legs;
            const totalDistance = legs.reduce((sum, leg) => sum + leg.distance.value, 0); // in meters
            const totalDuration = legs.reduce((sum, leg) => sum + leg.duration.value, 0); // in seconds

            // Convert distance to kilometers and duration to minutes
            const distanceInKm = (totalDistance / 1000).toFixed(2);
            const durationInMinutes = Math.ceil(totalDuration / 60);

            // Update assigned driver with distance and ETA
            setAssignedDriver((prev) => ({
              ...prev,
              distance: `${distanceInKm} km`,
              eta: `${durationInMinutes} min`
            }));

            setProgressStep(2); // Step 2: Delivery driver coming

            // Start simulating driver movement
            simulateDriverMovement(route);
          } else {
            console.error("Directions request failed due to", status);
            setError("Failed to fetch route.");
          }
          setIsLoading(false);
        }
      );

    } catch (err) {
      console.error("Error in assignDriver:", err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    console.log(`Rating submitted: ${rating} stars`);
    setIsModalOpen(false); // Close the modal
    setProgressStep(0); // Reset progress
    setOrderLocation(null); // Reset order location
    setMovingDriverPosition(null); // Reset moving driver position

    // Update driver availability to true
    if (assignedDriver && assignedDriver._id) {
      try {
        await fetch(`http://localhost:4000/api/drivers/${assignedDriver._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ available: true }),
        });
      } catch (err) {
        console.error('Failed to update driver availability:', err);
      }
    }
    setAssignedDriver(null); // Reset assigned driver after update
    navigate('/'); // Navigate to home page after confirm
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-green-50 to-green-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-gray-800 flex items-center gap-2">
        <span className="text-green-600">Food</span> Hub
        <span className="ml-2 text-sm font-light text-gray-400">Delivery Assignment</span>
      </h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['Assign', 'Deliver', 'Confirm'].map((step, idx) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div className={`rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold shadow-lg transition
                ${progressStep > idx ? 'bg-green-500' : progressStep === idx ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-semibold ${progressStep >= idx ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          {[0, 1].map((i) => (
            <div key={i} className={`flex-1 h-1 mx-1 rounded-full transition-all duration-300
              ${progressStep > i ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Map Section */}
        <div className="flex-1 rounded-xl shadow-lg overflow-hidden bg-white">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onClick={handleMapClick}
              onLoad={map => (mapRef.current = map)}
            >
              {/* Marker for the order location */}
              {orderLocation && (
                <Marker
                  position={orderLocation}
                  icon={{ url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
                />
              )}

              {/* Marker for the restaurant */}
              <Marker
                position={{ lat: 6.922201, lng: 79.913870 }}
                icon={{ url: 'https://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png' }}
              />

              {/* Add markers for all available drivers */}
              {drivers.map((driver) => (
                <Marker
                  key={driver._id}
                  position={{ lat: driver.location.lat, lng: driver.location.lng }}
                  icon={{
                    url: vehicleIcons[driver.vehicleType] || vehicleIcons.default,
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  title={`Driver: ${driver.name}, Contact: ${driver.contact}`}
                  onClick={() => setSelectedDriver(driver)} // Set selected driver on marker click
                />
              ))}

              {/* InfoWindow for selected driver */}
              {selectedDriver && (
                <InfoWindow
                  position={{
                    lat: selectedDriver.location.lat,
                    lng: selectedDriver.location.lng,
                  }}
                  onCloseClick={() => setSelectedDriver(null)}
                >
                  <div>
                    <p className="font-bold">{selectedDriver.name}</p>
                    <p>📱 {selectedDriver.contact}</p>
                    <p>📍 {selectedDriver.location.lat.toFixed(4)}, {selectedDriver.location.lng.toFixed(4)}</p>
                    <p>{selectedDriver.available ? '🟢 Available' : '🔴 Busy'}</p>
                    <p>🚗 {selectedDriver.vehicleType}</p>
                    {selectedDriver.profilePicture && (
                      <img
                        src={selectedDriver.profilePicture}
                        alt="Profile"
                        style={{ width: 60, height: 60, borderRadius: '50%', marginTop: 8 }}
                      />
                    )}
                  </div>
                </InfoWindow>
              )}

              {/* Marker for the moving driver (if assigned) */}
              {movingDriverPosition && (
                <Marker
                  position={movingDriverPosition}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/kml/shapes/motorcycling.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              )}

              {/* Directions Renderer */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true, // <--- Hide default A/B/C markers
                    polylineOptions: {
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 6,
                    },
                  }}
                  onLoad={() => {
    if (mapRef.current && orderLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      // Add restaurant location
      bounds.extend(new window.google.maps.LatLng(6.917694343785189, 79.91027226871032));
      // Add order location
      bounds.extend(new window.google.maps.LatLng(orderLocation.lat, orderLocation.lng));
      mapRef.current.fitBounds(bounds);

      // Optionally, pan a bit if you want to adjust for layout
      // window.setTimeout(() => {
      //   const currentCenter = mapRef.current.getCenter();
      //   mapRef.current.panTo({
      //     lat: currentCenter.lat(),
      //     lng: currentCenter.lng() + 0.01,
      //   });
      // }, 400);
    }
  }}


                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Driver & Actions Section */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={getUserLocation}
              className="p-3 bg-green-100 hover:bg-green-200 rounded-full shadow transition"
              title="Detect my location"
            >
              <FaLocationCrosshairs className="text-green-600 text-2xl" />
            </button>
            <span className="text-lg font-medium text-gray-700">Set your location</span>
          </div>
          <p className="text-gray-500 mb-4">Or click on the map to select your location manually.</p>

          {assignedDriver ? (
            <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center animate-fade-in">
              <img
                src={assignedDriver?.profilePicture || driv}
                alt="Driver Avatar"
                className="w-20 h-20 rounded-full border-4 border-green-200 shadow mb-3"
              />
              <h3 className="text-xl font-bold text-green-700">{assignedDriver.driver}</h3>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaPhoneAlt className="text-green-500" /> {assignedDriver.contact}
              </p>
              <div className="flex gap-4 mt-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold shadow">
                  Distance: {assignedDriver.distance}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold shadow">
                  ETA: {assignedDriver.eta}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-5 text-center animate-fade-in">
              <p className="text-gray-700 font-medium">No driver assigned yet.</p>
              <p className="text-gray-400 text-sm">Please select a location or use the button above.</p>
            </div>
          )}

          <button
            onClick={assignDriver}
            disabled={!orderLocation || isLoading || assignedDriver} // Disable if assignedDriver exists
            className={`mt-8 w-full py-3 rounded-lg text-lg font-bold shadow transition
              ${orderLocation && !assignedDriver && !isLoading
                ? 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {isLoading ? 'Assigning...' : assignedDriver ? 'Driver Assigned' : 'Assign Driver'}
          </button>
        </div>
      </div>

      {/* Modal for confirmation and rating */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="modal fixed top-40 left-0 right-10 mx-auto mt-8 max-w-lg z-50 w-190 bg-black p-10" // <-- Add fixed, top, and z-index
        overlayClassName="modal-overlay fixed inset-0 bg-opacity-40 z-40" // <-- Ensure overlay covers whole screen
   
      >
        <div className="p-8 text-center">
          <div className="mb-4 animate-bounce">
            <svg className="mx-auto w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path stroke="currentColor" strokeWidth="4" d="M8 12l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-green-700">Delivery Completed!</h2>
          <p className="mb-4 text-gray-600">Thank you for using Food Hub. Please rate your experience:</p>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-4xl transition ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleConfirm}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {isLoading && <Spinner />}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg shadow text-center font-semibold">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default AssignDriver;
