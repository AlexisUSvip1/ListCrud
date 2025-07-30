import { useState, useEffect } from 'react';
import axios from 'axios';

const useVehicleDetail = (id, navigate) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicles/${id}`);
        setVehicle(response.data);
      } catch (err) {
        setError('Error al obtener los datos del vehículo.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      await axios.put(`http://localhost:3001/vehicles/${id}`, {
        ...vehicle,
        status: newStatus,
      });
      setVehicle((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError('No se pudo actualizar el estado.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este vehículo?');
    if (!confirm) return;

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:3001/vehicles/${id}`);
      navigate('/');
    } catch (err) {
      setError('Error al eliminar el vehículo.');
    } finally {
      setDeleting(false);
    }
  };

  return {
    vehicle,
    loading,
    updating,
    deleting,
    error,
    handleStatusChange,
    handleDelete,
  };
};

export default useVehicleDetail;
