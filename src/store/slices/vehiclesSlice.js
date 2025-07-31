import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../../utils/api';

// Async thunks
export const fetchAllVehicles = createAsyncThunk(
  'vehicles/fetchAllVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      return vehicles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVehicleInList = createAsyncThunk(
  'vehicles/updateVehicleInList',
  async (updatedVehicle, { rejectWithValue }) => {
    try {
      const vehicle = await vehicleService.updateVehicle(updatedVehicle.id, updatedVehicle);
      return vehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVehicleFromList = createAsyncThunk(
  'vehicles/deleteVehicleFromList',
  async (vehicleId, { rejectWithValue }) => {
    try {
      await vehicleService.deleteVehicle(vehicleId);
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const reloadVehicles = createAsyncThunk(
  'vehicles/reloadVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      return vehicles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allVehicles: [],
  filteredVehicles: [],
  currentPageVehicles: [],
  loading: false,
  error: null,
  search: '',
  statusFilter: 'Todos',
  currentPage: 1,
  totalCount: 0,
  totalPages: 0,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addVehicle: (state, action) => {
      state.allVehicles.push(action.payload);
    },
    updateVehicleStatus: (state, action) => {
      const { id, status } = action.payload;
      const vehicle = state.allVehicles.find(v => v.id === id);
      if (vehicle) {
        vehicle.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllVehicles
      .addCase(fetchAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateVehicleInList
      .addCase(updateVehicleInList.fulfilled, (state, action) => {
        const index = state.allVehicles.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.allVehicles[index] = action.payload;
        }
      })
      // deleteVehicleFromList
      .addCase(deleteVehicleFromList.fulfilled, (state, action) => {
        state.allVehicles = state.allVehicles.filter(v => v.id !== action.payload);
      })
      // reloadVehicles
      .addCase(reloadVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reloadVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
      })
      .addCase(reloadVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllVehicles = (state) => state.vehicles.allVehicles;
export const selectFilteredVehicles = (state) => state.vehicles.filteredVehicles;
export const selectCurrentPageVehicles = (state) => state.vehicles.currentPageVehicles;
export const selectVehiclesLoading = (state) => state.vehicles.loading;
export const selectVehiclesError = (state) => state.vehicles.error;
export const selectSearch = (state) => state.vehicles.search;
export const selectStatusFilter = (state) => state.vehicles.statusFilter;
export const selectCurrentPage = (state) => state.vehicles.currentPage;
export const selectTotalCount = (state) => state.vehicles.totalCount;
export const selectTotalPages = (state) => state.vehicles.totalPages;

// Computed selectors
export const selectFilteredAndPaginatedVehicles = (state) => {
  const { allVehicles, search, statusFilter, currentPage } = state.vehicles;
  
  // Filter vehicles
  let filtered = allVehicles.filter(vehicle => {
    // Search filter
    if (search) {
      const searchValue = search.toLowerCase();
      const licensePlate = vehicle.licensePlate?.toLowerCase() || '';
      const make = vehicle.make?.toLowerCase() || '';
      const model = vehicle.model?.toLowerCase() || '';
      
      const matchesSearch = licensePlate.includes(searchValue) || 
                           make.includes(searchValue) || 
                           model.includes(searchValue);
      
      if (!matchesSearch) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== 'Todos') {
      if (vehicle.status !== statusFilter) {
        return false;
      }
    }

    return true;
  });

  // Pagination
  const vehiclesPerPage = 10;
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / vehiclesPerPage);
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const endIndex = startIndex + vehiclesPerPage;
  const currentPageVehicles = filtered.slice(startIndex, endIndex);

  return {
    vehicles: currentPageVehicles,
    totalCount,
    totalPages,
    filteredVehicles: filtered,
  };
};

export const { 
  setSearch, 
  setStatusFilter, 
  setCurrentPage, 
  clearError, 
  addVehicle, 
  updateVehicleStatus 
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer; 