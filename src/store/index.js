import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './slices/vehiclesSlice';
import vehicleDetailReducer from './slices/vehicleDetailSlice';
import createVehicleReducer from './slices/createVehicleSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    vehicleDetail: vehicleDetailReducer,
    createVehicle: createVehicleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store; 