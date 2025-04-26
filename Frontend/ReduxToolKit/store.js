import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import driverReducer from "./driverSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    driver: driverReducer,
  },
});

export default store;
