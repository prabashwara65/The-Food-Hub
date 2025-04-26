import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    phone: '',
    email: '',
    location: {
        lat: null, // Latitude
        lng: null, // Longitude
    },
    available: true,
    vehicleType: 'bike', // Default vehicle type
    emailVerified: false,
};

const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        setDriverDetails: (state, action) => {
            const { name, phone, email, location, available, vehicleType } = action.payload;

            // Update fields only if they are provided in the payload
            if (name) state.name = name;
            if (phone) state.phone = phone;
            if (email) state.email = email;
            if (location) {
                if (location.lat !== undefined) state.location.lat = location.lat; // Set latitude
                if (location.lng !== undefined) state.location.lng = location.lng; // Set longitude
            }
            if (available !== undefined) state.available = available;
            if (vehicleType) state.vehicleType = vehicleType;
        },
        verifyEmail: (state) => {
            state.emailVerified = true;
        },
    },
});

export const { setDriverDetails, verifyEmail } = driverSlice.actions;
export default driverSlice.reducer;