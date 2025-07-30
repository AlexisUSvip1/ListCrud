import { useState, useEffect } from 'react';
import axios from 'axios';

const useVehicles = (search, statusFilter, page) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        let url = `http://localhost:3001/vehicles?_page=${page}&_limit=10`;

        if (search) {
          url += `&q=${search}`;
        }

        if (statusFilter !== 'Todos') {
          url += `&status=${statusFilter}`;
        }

        const response = await axios.get(url);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error al obtener vehículos:', error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, [search, statusFilter, page]);

  return vehicles;
};

export default useVehicles;
