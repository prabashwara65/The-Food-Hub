// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Store user data (like name, email)
  token: null, // Store JWT token
  isAuthenticated: false, // Track if the user is authenticated
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; // Save user info in state
      state.token = action.payload.token; // Save token in state
      state.isAuthenticated = true; // Mark the user as authenticated
    },
    logOut: (state) => {
      state.user = null; // Clear user info
      state.token = null; // Clear token
      state.isAuthenticated = false; // Mark user as logged out
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
