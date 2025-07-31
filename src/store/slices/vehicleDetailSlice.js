import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../../utils/api';

// Async thunks
export const fetchVehicleById = createAsyncThunk(
  'vehicleDetail/fetchVehicleById',
  async (id, { rejectWithValue }) => {
    try {
      const vehicle = await vehicleService.getVehicleById(id);
      return vehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVehicleDetail = createAsyncThunk(
  'vehicleDetail/updateVehicleDetail',
  async ({ id, vehicleData }, { rejectWithValue, dispatch }) => {
    try {
      const updatedVehicle = await vehicleService.updateVehicle(id, vehicleData);
      // Trigger reload of vehicles list
      window.dispatchEvent(new CustomEvent('vehicleUpdated'));
      return updatedVehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVehicleStatusDetail = createAsyncThunk(
  'vehicleDetail/updateVehicleStatusDetail',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const updatedVehicle = await vehicleService.updateVehicleStatus(id, status);
      // Trigger reload of vehicles list
      window.dispatchEvent(new CustomEvent('vehicleUpdated'));
      return updatedVehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVehicleDetail = createAsyncThunk(
  'vehicleDetail/deleteVehicleDetail',
  async (id, { rejectWithValue }) => {
    try {
      await vehicleService.deleteVehicle(id);
      // Trigger reload of vehicles list
      window.dispatchEvent(new CustomEvent('vehicleUpdated'));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  vehicle: null,
  loading: false,
  updating: false,
  deleting: false,
  error: null,
  editModalOpen: false,
  deleteModalOpen: false,
  editForm: {},
  newStatus: '',
};

const vehicleDetailSlice = createSlice({
  name: 'vehicleDetail',
  initialState,
  reducers: {
    setEditModalOpen: (state, action) => {
      state.editModalOpen = action.payload;
    },
    setDeleteModalOpen: (state, action) => {
      state.deleteModalOpen = action.payload;
    },
    setEditForm: (state, action) => {
      state.editForm = action.payload;
    },
    updateEditForm: (state, action) => {
      const { field, value } = action.payload;
      state.editForm[field] = value;
    },
    updateEditFormLocation: (state, action) => {
      const { field, value } = action.payload;
      if (!state.editForm.location) {
        state.editForm.location = {};
      }
      state.editForm.location[field] = parseFloat(value);
    },
    setNewStatus: (state, action) => {
      state.newStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetVehicleDetail: (state) => {
      state.vehicle = null;
      state.editForm = {};
      state.newStatus = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchVehicleById
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicle = action.payload;
        state.editForm = action.payload;
        state.newStatus = action.payload.status;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateVehicleDetail
      .addCase(updateVehicleDetail.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateVehicleDetail.fulfilled, (state, action) => {
        state.updating = false;
        state.vehicle = action.payload;
        state.editModalOpen = false;
      })
      .addCase(updateVehicleDetail.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      // updateVehicleStatusDetail
      .addCase(updateVehicleStatusDetail.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateVehicleStatusDetail.fulfilled, (state, action) => {
        state.updating = false;
        state.vehicle = action.payload;
        state.newStatus = action.payload.status;
      })
      .addCase(updateVehicleStatusDetail.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      // deleteVehicleDetail
      .addCase(deleteVehicleDetail.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteVehicleDetail.fulfilled, (state) => {
        state.deleting = false;
        state.deleteModalOpen = false;
      })
      .addCase(deleteVehicleDetail.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectVehicle = (state) => state.vehicleDetail.vehicle;
export const selectVehicleDetailLoading = (state) => state.vehicleDetail.loading;
export const selectVehicleDetailUpdating = (state) => state.vehicleDetail.updating;
export const selectVehicleDetailDeleting = (state) => state.vehicleDetail.deleting;
export const selectVehicleDetailError = (state) => state.vehicleDetail.error;
export const selectEditModalOpen = (state) => state.vehicleDetail.editModalOpen;
export const selectDeleteModalOpen = (state) => state.vehicleDetail.deleteModalOpen;
export const selectEditForm = (state) => state.vehicleDetail.editForm;
export const selectNewStatus = (state) => state.vehicleDetail.newStatus;

export const {
  setEditModalOpen,
  setDeleteModalOpen,
  setEditForm,
  updateEditForm,
  updateEditFormLocation,
  setNewStatus,
  clearError,
  resetVehicleDetail,
} = vehicleDetailSlice.actions;

export default vehicleDetailSlice.reducer; 