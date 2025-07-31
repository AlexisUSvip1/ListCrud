import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../../utils/api';

// Async thunks
export const createVehicle = createAsyncThunk(
  'createVehicle/createVehicle',
  async (vehicleData, { rejectWithValue }) => {
    try {
      const newVehicle = await vehicleService.createVehicle(vehicleData);
      // Trigger reload of vehicles list
      window.dispatchEvent(new CustomEvent('vehicleUpdated'));
      return newVehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  formData: {
    licensePlate: '',
    make: '',
    model: '',
    year: '',
    status: 'Disponible',
    lastService: '',
    odometer: '',
    locationLat: '',
    locationLng: '',
    gpsActive: true,
  },
  loading: false,
  error: null,
  success: false,
};

const createVehicleSlice = createSlice({
  name: 'createVehicle',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateLocationField: (state, action) => {
      const { field, value } = action.payload;
      if (field === 'lat') {
        state.formData.locationLat = value;
      } else if (field === 'lng') {
        state.formData.locationLng = value;
      }
    },
    resetForm: (state) => {
      state.formData = {
        licensePlate: '',
        make: '',
        model: '',
        year: '',
        status: 'Disponible',
        lastService: '',
        odometer: '',
        locationLat: '',
        locationLng: '',
        gpsActive: true,
      };
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = {
          licensePlate: '',
          make: '',
          model: '',
          year: '',
          status: 'Disponible',
          lastService: '',
          odometer: '',
          locationLat: '',
          locationLng: '',
          gpsActive: true,
        };
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Selectors
export const selectCreateVehicleFormData = (state) => state.createVehicle.formData;
export const selectCreateVehicleLoading = (state) => state.createVehicle.loading;
export const selectCreateVehicleError = (state) => state.createVehicle.error;
export const selectCreateVehicleSuccess = (state) => state.createVehicle.success;

export const {
  updateFormField,
  updateLocationField,
  resetForm,
  clearError,
  clearSuccess,
} = createVehicleSlice.actions;

export default createVehicleSlice.reducer; 