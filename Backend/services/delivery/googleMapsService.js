const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function calculateDistance(origin, destination) {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: GOOGLE_MAPS_API_KEY,
        mode: 'driving'
      }
    });

    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      return element.distance.value;
    } else {
      throw new Error(`Distance Matrix error: ${element.status}`);
    }
  } catch (error) {
    console.error('Error calculating distance:', error.message);
    throw error;
  }
}

async function getDirections(origin, destination) {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        key: GOOGLE_MAPS_API_KEY,
        mode: 'driving'
      }
    });

    if (response.data.status === 'OK') {
      return response.data;
    } else {
      throw new Error(`Directions API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error getting directions:', error.message);
    throw error;
  }
}

module.exports = { calculateDistance, getDirections };
