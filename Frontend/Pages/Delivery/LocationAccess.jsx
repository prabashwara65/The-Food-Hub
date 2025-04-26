import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDriverDetails } from '../../ReduxToolKit/driverSlice'; // Import the action to update location
import axios from 'axios'; // Import Axios for API calls

const LocationAccess = () => {
  const { name, email, available, phone, vehicleType, location } = useSelector((state) => state.driver); // Access location from Redux state
  const dispatch = useDispatch();

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Update location in Redux state
          dispatch(
            setDriverDetails({
              location: { lat: latitude, lng: longitude },
            })
          );

          console.log('Location:', { name, email, available, vehicleType, phone, lat: latitude, lng: longitude });

          // Prepare data to send to the API
          const driverData = {
            name,
            email,
            available,
            vehicleType,
            phone,
            location: { lat: latitude, lng: longitude },
          };

          try {
            console.log('Driver Data to be sent:', driverData);

            // Send data to the API
            const response = await axios.post('http://localhost:8000/api/drivers', driverData);

            console.log('API Response:', response);

            if (response.status === 200) {
              console.log('Driver data stored successfully:', response.data);
            } else {
              console.log('Failed to store driver data:', response.data);
            }
          } catch (error) {
            console.error('Error storing driver data:', error.response || error.message);
            alert('An error occurred while storing driver data. Please try again.');
          }
        },
        () => {
          alert('Location access denied!');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome, {name || 'Guest'}!
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Your vehicle type: <span className="font-semibold">{vehicleType || 'Not specified'}</span>
        </p>
        <p className="text-gray-600 text-center mb-6">
          Current Location: <br />
          <span className="font-semibold">
            Latitude: {location?.lat ?? 'N/A'}, Longitude: {location?.lng ?? 'N/A'}
          </span>
        </p>
        <button
          onClick={handleLocationAccess}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Grant Location Access
        </button>
      </div>
    </div>
  );
};

export default LocationAccess;