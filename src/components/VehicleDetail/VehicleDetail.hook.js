import { useState, useEffect } from 'react';
import { vehicleService, triggerVehicleUpdate, triggerVehicleStatusUpdate } from '../../utils/api';

const useVehicleDetail = (id, navigate) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await vehicleService.getVehicleById(id);
        setVehicle(vehicleData);
        setEditForm(vehicleData); // Inicializar el formulario con los datos del vehículo
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      setVehicle((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await vehicleService.deleteVehicle(id);
      setDeleteModalOpen(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
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
      setVehicle(editForm);
      setEditModalOpen(false);
      // Recargar la lista de vehículos en la página principal
      triggerVehicleUpdate();
      // También disparar un evento para actualizar el estado local
      triggerVehicleStatusUpdate(editForm.status);
    } catch (err) {
      setError(err.message);
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
    deleteModalOpen,
    handleStatusChange,
    handleDelete,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    handleEditFormChange,
    handleLocationChange,
    handleSaveEdit,
  };
};

export default useVehicleDetail;
