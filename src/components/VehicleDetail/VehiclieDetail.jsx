import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useVehicleDetail from './VehicleDetail.hook';
import { 
  Container, 
  Title, 
  InfoText, 
  ButtonContainer, 
  StatusButton, 
  DeleteButton, 
  DetailCard, 
  EditButton
} from './VehicleDetail.styles';
import Modal from '../../utils/Modal';
import VehicleEditForm from '../../utils/VehicleEditForm';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
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
  } = useVehicleDetail(id, navigate);

  const [newStatus, setNewStatus] = useState('');

  // Sincronizar el estado local con el vehículo actual
  useEffect(() => {
    if (vehicle) {
      setNewStatus(vehicle.status);
    }
  }, [vehicle]);

  // Escuchar cuando se actualiza el estado desde el modal
  useEffect(() => {
    const handleStatusUpdate = (event) => {
      setNewStatus(event.detail);
    };

    window.addEventListener('vehicleStatusUpdated', handleStatusUpdate);

    return () => {
      window.removeEventListener('vehicleStatusUpdated', handleStatusUpdate);
    };
  }, []);

  const handleStatusUpdate = () => {
    handleStatusChange(newStatus);
  };

  if (loading) return <Container><Title>Cargando...</Title></Container>;
  if (error) return <Container><Title>{error}</Title></Container>;
  if (!vehicle) return <Container><Title>Vehículo no encontrado.</Title></Container>;

  return (
    <Container>
      <DetailCard>
        <Title>Detalle del vehículo</Title>

        <InfoText><strong>Placa:</strong> {vehicle.licensePlate}</InfoText>
        <InfoText><strong>Marca:</strong> {vehicle.make}</InfoText>
        <InfoText><strong>Modelo:</strong> {vehicle.model}</InfoText>
        <InfoText><strong>Año:</strong> {vehicle.year}</InfoText>
        <InfoText><strong>Estado:</strong> {vehicle.status}</InfoText>
        <InfoText><strong>Último servicio:</strong> {vehicle.lastService}</InfoText>
        <InfoText><strong>Kilometraje:</strong> {vehicle.odometer} km</InfoText>
        <InfoText><strong>Ubicación:</strong> Lat: {vehicle.location.lat}, Lng: {vehicle.location.lng}</InfoText>
        <InfoText><strong>Estado GPS:</strong> {vehicle.gpsActive ? "Activo" : "Inactivo"}</InfoText>

        <ButtonContainer>
          <EditButton
            onClick={openEditModal}
            disabled={updating}
          >
            Editar vehículo
          </EditButton>

          <StatusButton
            onClick={handleStatusUpdate}
            disabled={updating || vehicle.status === newStatus}
          >
            Guardar cambios
          </StatusButton>

          <DeleteButton
            onClick={handleDelete}
            disabled={deleting}
          >
            Eliminar vehículo
          </DeleteButton>
        </ButtonContainer>
      </DetailCard>

      {/* Modal reutilizable para edición */}
      <Modal
        open={editModalOpen}
        onClose={closeEditModal}
        title="Editar vehículo"
        onSave={handleSaveEdit}
        onCancel={closeEditModal}
        loading={updating}
        saveText="Guardar"
        cancelText="Cancelar"
      >
        <VehicleEditForm
          formData={editForm}
          onFormChange={handleEditFormChange}
          onLocationChange={handleLocationChange}
        />
      </Modal>
    </Container>
  );
};

export default VehicleDetail;