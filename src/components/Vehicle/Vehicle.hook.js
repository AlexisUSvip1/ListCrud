import { useEffect, useState } from 'react';
import axios from 'axios';

const useVehicles = (search, statusFilter, page, searchType) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3001/vehicles?_page=${page}&_limit=10`; // Paginación

      if (search) {
        url += `&${searchType}=${search}`; // Filtrar por placa, marca o modelo
      }

      if (statusFilter !== 'Todos') {
        url += `&status=${statusFilter}`; // Filtrar por estado (Disponible, En mantenimiento)
      }

      const response = await axios.get(url); // Realiza la solicitud GET
      setVehicles(response.data); // Guarda los vehículos obtenidos en el estado
    } catch (err) {
      setError("Error al cargar los vehículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [search, statusFilter, page, searchType]); // Asegúrate de que useEffect se dispare cuando searchType cambie

  // Escuchar el evento de actualización de vehículo
  useEffect(() => {
    const handleVehicleUpdate = () => {
      fetchVehicles();
    };

    window.addEventListener('vehicleUpdated', handleVehicleUpdate);

    return () => {
      window.removeEventListener('vehicleUpdated', handleVehicleUpdate);
    };
  }, [search, statusFilter, page, searchType]);

  return vehicles;
};

export default useVehicles;