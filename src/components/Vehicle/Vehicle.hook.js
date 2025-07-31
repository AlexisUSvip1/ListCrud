import { useEffect, useState, useCallback } from 'react';
import { vehicleService } from '../../utils/api';

const useVehicles = (search, statusFilter, page) => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching all vehicles...');
      const vehicles = await vehicleService.getAllVehicles();
      console.log('All vehicles received:', vehicles.length);
      setAllVehicles(vehicles);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto principal que se ejecuta solo una vez al montar el componente
  useEffect(() => {
    console.log('Initial fetch triggered');
    fetchAllVehicles();
  }, [fetchAllVehicles]);

  // Efecto para escuchar actualizaciones de vehículos
  useEffect(() => {
    const handleVehicleUpdate = () => {
      console.log('Vehicle update event received, refetching...');
      fetchAllVehicles();
    };

    window.addEventListener('vehicleUpdated', handleVehicleUpdate);
    return () => {
      window.removeEventListener('vehicleUpdated', handleVehicleUpdate);
    };
  }, [fetchAllVehicles]);

  // Filtrar vehículos según los criterios
  const filteredVehicles = allVehicles.filter(vehicle => {
    // Filtro por búsqueda (placa, marca y modelo)
    if (search) {
      const searchValue = search.toLowerCase();
      const licensePlate = vehicle.licensePlate?.toLowerCase() || '';
      const make = vehicle.make?.toLowerCase() || '';
      const model = vehicle.model?.toLowerCase() || '';
      
      // Buscar en placa, marca y modelo
      const matchesSearch = licensePlate.includes(searchValue) || 
                           make.includes(searchValue) || 
                           model.includes(searchValue);
      
      if (!matchesSearch) {
        return false;
      }
    }

    // Filtro por estado
    if (statusFilter !== 'Todos') {
      if (vehicle.status !== statusFilter) {
        return false;
      }
    }

    return true;
  });

  // Calcular paginación
  const vehiclesPerPage = 10;
  const totalCount = filteredVehicles.length;
  const totalPages = Math.ceil(totalCount / vehiclesPerPage);
  const startIndex = (page - 1) * vehiclesPerPage;
  const endIndex = startIndex + vehiclesPerPage;
  const vehicles = filteredVehicles.slice(startIndex, endIndex);

  console.log('=== Pagination Debug ===');
  console.log('All vehicles:', allVehicles.length);
  console.log('Filtered vehicles:', filteredVehicles.length);
  console.log('Current page:', page);
  console.log('Total pages:', totalPages);
  console.log('Vehicles in current page:', vehicles.length);
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  console.log('Search term:', search);
  console.log('Status filter:', statusFilter);

  return { vehicles, loading, error, totalCount };
};

export default useVehicles;