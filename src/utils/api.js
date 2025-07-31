import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Configuración base de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// Servicios para vehículos
export const vehicleService = {
  // Obtener todos los vehículos
  getAllVehicles: async () => {
    try {
      const response = await api.get('/vehicles');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los vehículos');
    }
  },

  // Obtener vehículos con paginación y filtros
  getVehiclesWithFilters: async (page = 1, limit = 10, filters = {}) => {
    try {
      let url = `/vehicles?_page=${page}&_limit=${limit}`;
      
      if (filters.search && filters.searchType) {
        url += `&${filters.searchType}=${filters.search}`;
      }
      
      if (filters.status && filters.status !== 'Todos') {
        url += `&status=${filters.status}`;
      }

      const response = await api.get(url);
      return {
        vehicles: response.data,
        totalCount: Number(response.headers['x-total-count']) || response.data.length
      };
    } catch (error) {
      throw new Error('Error al obtener los vehículos con filtros');
    }
  },

  // Obtener un vehículo por ID
  getVehicleById: async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el vehículo');
    }
  },

  // Crear un nuevo vehículo
  createVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/vehicles', vehicleData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el vehículo');
    }
  },

  // Actualizar un vehículo
  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await api.put(`/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el vehículo');
    }
  },

  // Eliminar un vehículo
  deleteVehicle: async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el vehículo');
    }
  },

  // Actualizar solo el estado de un vehículo
  updateVehicleStatus: async (id, status) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      const vehicle = response.data;
      
      const updatedVehicle = { ...vehicle, status };
      const updateResponse = await api.put(`/vehicles/${id}`, updatedVehicle);
      return updateResponse.data;
    } catch (error) {
      throw new Error('Error al actualizar el estado del vehículo');
    }
  }
};

// Función para disparar evento de actualización (mantenida para compatibilidad)
export const triggerVehicleUpdate = () => {
  window.dispatchEvent(new CustomEvent('vehicleUpdated'));
};

// Función para disparar evento de actualización de estado (mantenida para compatibilidad)
export const triggerVehicleStatusUpdate = (status) => {
  window.dispatchEvent(new CustomEvent('vehicleStatusUpdated', { detail: status }));
};

export default api; 