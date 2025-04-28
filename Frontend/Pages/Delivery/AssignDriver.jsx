import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { FaLocationCrosshairs } from "react-icons/fa6";
import driv from '../../assets/images/driver1.png';
import { FaPhoneAlt } from "react-icons/fa";
import Modal from 'react-modal'; // Import Modal for popup

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

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = { lat: 6.9271, lng: 79.8612 };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:4002/api/drivers/available');
        const data = await response.json();
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
      const response = await fetch('http://localhost:4002/api/assign-driver', {
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

  const handleConfirm = () => {
    console.log(`Rating submitted: ${rating} stars`);
    setIsModalOpen(false); // Close the modal
    setProgressStep(0); // Reset progress
    setOrderLocation(null); // Reset order location
    setAssignedDriver(null); // Reset assigned driver
    setMovingDriverPosition(null); // Reset moving driver position
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-5" style={{ fontSize: '24px' }}>Food <span className="text-green-500">Hub</span></h1>

      <div className="mb-5">
        <div className="flex justify-between items-center">
          <div className={`w-1/3 h-2 ${progressStep >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <div className={`w-1/3 h-2 ${progressStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <div className={`w-1/3 h-2 ${progressStep >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className={`${progressStep >= 1 ? 'text-green-500' : 'text-gray-500'}`}>Assigning Driver</span>
          <span className={`${progressStep >= 2 ? 'text-green-500' : 'text-gray-500'}`}>Delivering</span>
          <span className={`${progressStep >= 3 ? 'text-green-500' : 'text-gray-500'}`}>Confirmation</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-3.5 w-full md:w-3/4">
          <LoadScript googleMapsApiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onClick={handleMapClick}
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

              {/* Add markers for available drivers */}
              {drivers.map((driver) => (
                <Marker
                  key={driver._id}
                  position={{ lat: driver.location.lat, lng: driver.location.lng }}
                  icon={{
                    url: vehicleIcons[driver.vehicleType] || vehicleIcons.default,
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  title={`Driver: ${driver.name}, Contact: ${driver.contact}`}
                />
              ))}

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
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 6,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="flex-1 text-center">
          <div className="mb-5 flex flex-row gap-4 items-center">
            <p className="mb-2" style={{ fontSize: '24px' }}>Your location</p>
            {/* Button to detect location automatically */}
            <button
              onClick={getUserLocation}
              className="p-2 text-xl bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <FaLocationCrosshairs />
            </button>
          </div>

          <p className="text-gray-500 mb-4">Or click on the map to select your location manually.</p>

          {assignedDriver ? (
            <div className="mt-5 p-4 bg-gray-100 rounded-md shadow-md items-center">
              <div className="flex flex-row items-center gap-10 pl-15">
                <div className="flex flex-col gap-10">
                  <img
                    src={driv}
                    alt="Driver Avatar"
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{assignedDriver.driver}</h3>
                </div>
              </div>
              <div className="bg-black w-full">
                <p className="text-white flex items-center gap-8 pl-20 p-2">
                  <FaPhoneAlt className="text-green-500 w-6 h-6" /> {assignedDriver.contact}
                </p>
              </div>
              <br />
              <div className="bg-black w-full">
                <p className="text-white flex items-center gap-8 pl-20 p-2">
                  <strong>Distance:</strong> {assignedDriver.distance}
                </p>
                <p className="text-white flex items-center gap-8 pl-20 p-2">
                  <strong>ETA:</strong> {assignedDriver.eta}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 p-4 bg-gray-100 rounded-md shadow-md text-center">
              <p className="text-gray-700">No driver assigned yet.</p>
              <p className="text-gray-500">Please select a location on the map or use the button above to detect your location.</p>
            </div>
          )}
        </div>
      </div>

      {/* Available Drivers Section */}
      {!assignedDriver && (
        <div className="my-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            Available Drivers ({drivers.filter((d) => d.available).length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <div
                key={driver._id}
                className={`p-3 rounded-md ${driver.available ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <p className="font-bold">{driver.name}</p>
               
                <p>📱 {driver.contact}</p>
                <p>📍 {driver.location.lat.toFixed(4)}, {driver.location.lng.toFixed(4)}</p>
                <p>{driver.available ? '🟢 Available' : '🔴 Busy'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={assignDriver}
          disabled={!orderLocation || isLoading}
          className={`px-5 py-2 rounded-md text-white font-semibold transition ${
            orderLocation ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Assigning...' : 'Assign Driver'}
        </button>
      </div>

      {isLoading && <Spinner />}

      {error && (
        <div className="mt-5 p-3 bg-red-100 text-red-600 rounded-md text-center">
          Error: {error}
        </div>
      )}

      {assignedDriver && (
        <div className="mt-5 p-5 bg-green-100 rounded-md shadow-md">
          <h3 className="text-green-700 font-bold text-lg mb-3">
            {vehicleIcons[assignedDriver.vehicleType]} Driver Assigned!
          </h3>
          <p><strong>Driver:</strong> {assignedDriver.driver}</p>
          <p><strong>Vehicle:</strong> {assignedDriver.vehicleType}</p>
          <p><strong>Distance:</strong> {assignedDriver.distance}</p>
          <p><strong>ETA:</strong> {assignedDriver.eta || 'Calculating...'}</p>
          <p><strong>Contact:</strong> {assignedDriver.contact}</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Track Delivery
          </button>
        </div>
      )}

      {/* Modal for confirmation and rating */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Delivery Completed!</h2>
          <p className="mb-4">Please rate your experience:</p>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AssignDriver;
