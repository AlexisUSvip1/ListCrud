import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { 
  IconButton,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../utils/Modal';
import VehicleEditForm from '../../utils/VehicleEditForm';
import {
  fetchVehicleById,
  updateVehicleDetail,
  updateVehicleStatusDetail,
  deleteVehicleDetail,
  setEditModalOpen,
  setDeleteModalOpen,
  selectVehicle,
  selectVehicleDetailLoading,
  selectVehicleDetailUpdating,
  selectVehicleDetailDeleting,
  selectVehicleDetailError,
  selectEditModalOpen,
  selectDeleteModalOpen,
  selectEditForm,
  selectNewStatus,
} from '../../store/slices/vehicleDetailSlice';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors
  const vehicle = useSelector(selectVehicle);
  const loading = useSelector(selectVehicleDetailLoading);
  const updating = useSelector(selectVehicleDetailUpdating);
  const deleting = useSelector(selectVehicleDetailDeleting);
  const error = useSelector(selectVehicleDetailError);
  const editModalOpen = useSelector(selectEditModalOpen);
  const deleteModalOpen = useSelector(selectDeleteModalOpen);
  const editForm = useSelector(selectEditForm);
  const newStatus = useSelector(selectNewStatus);

  // Effects
  useEffect(() => {
    if (id) {
      dispatch(fetchVehicleById(id));
    }
  }, [dispatch, id]);

  // Event handlers
  const handleStatusUpdate = () => {
    dispatch(updateVehicleStatusDetail({ id, status: newStatus }));
  };

  const handleSaveEdit = () => {
    dispatch(updateVehicleDetail({ id, vehicleData: editForm }));
  };

  const handleDelete = () => {
    dispatch(deleteVehicleDetail(id)).then(() => {
      navigate('/');
    });
  };

  const openEditModal = () => {
    dispatch(setEditModalOpen(true));
  };

  const closeEditModal = () => {
    dispatch(setEditModalOpen(false));
  };

  const openDeleteModal = () => {
    dispatch(setDeleteModalOpen(true));
  };

  const closeDeleteModal = () => {
    dispatch(setDeleteModalOpen(false));
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEditFormChange = (field, value) => {
    // This will be handled by the VehicleEditForm component
  };

  const handleLocationChange = (field, value) => {
    // This will be handled by the VehicleEditForm component
  };

  if (loading) return <Container><Title>Cargando...</Title></Container>;
  if (error) return <Container><Title>{error}</Title></Container>;
  if (!vehicle) return <Container><Title>Vehículo no encontrado.</Title></Container>;

  return (
    <Container>
      <DetailCard>
      <IconButton onClick={handleBack} sx={{ mr: 3 }}>
        <ArrowBackIcon />
      </IconButton>
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
            onClick={openDeleteModal}
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

      {/* Modal de confirmación de eliminación */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirmar Eliminación"
        onSave={handleDelete}
        onCancel={closeDeleteModal}
        loading={deleting}
        saveText="Eliminar"
        cancelText="Cancelar"
        maxWidth="sm"
      >
        <Typography>
          ¿Estás seguro de que deseas eliminar el vehículo <strong>{vehicle?.licensePlate}</strong>?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Esta acción no se puede deshacer y eliminará permanentemente todos los datos del vehículo.
        </Typography>
      </Modal>
    </Container>
  );
};

export default VehicleDetail;