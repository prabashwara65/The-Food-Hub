import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import driverReducer from "./driverSlice";
import ownerReducer from "./ownerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    driver: driverReducer,
    owner: ownerReducer,
  },
});

export default store;
