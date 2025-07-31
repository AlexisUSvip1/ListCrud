import { useState, useEffect } from 'react';
import axios from 'axios';

const useVehicleDetail = (id, navigate) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicles/${id}`);
        setVehicle(response.data);
        setEditForm(response.data); // Inicializar el formulario con los datos del vehículo
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

  const openEditModal = () => {
    setEditForm(vehicle);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditForm(vehicle);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: parseFloat(value)
      }
    }));
  };

  const handleSaveEdit = async () => {
    try {
      setUpdating(true);
      await axios.put(`http://localhost:3001/vehicles/${id}`, editForm);
      setVehicle(editForm);
      setEditModalOpen(false);
      // Recargar la lista de vehículos en la página principal
      window.dispatchEvent(new CustomEvent('vehicleUpdated'));
      // También disparar un evento para actualizar el estado local
      window.dispatchEvent(new CustomEvent('vehicleStatusUpdated', { detail: editForm.status }));
    } catch (err) {
      setError('Error al actualizar el vehículo.');
    } finally {
      setUpdating(false);
    }
  };

  return {
    vehicle,
    loading,
    updating,
    deleting,
    error,
    editModalOpen,
    editForm,
    handleStatusChange,
    handleDelete,
    openEditModal,
    closeEditModal,
    handleEditFormChange,
    handleLocationChange,
    handleSaveEdit,
  };
};

export default useVehicleDetail;
