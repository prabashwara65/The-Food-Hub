import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './driverSlice';

const store = configureStore({
  reducer: {
    driver: driverReducer,
  },
});

export default store;