import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  FormCard,
  Title, 
  InputField, 
  StatusSelect, 
  SubmitButton, 
  ErrorText,
  LocationContainer,
  LocationField,
  SwitchContainer
} from './CreateVehicle.styles';
import { MenuItem, FormControlLabel, Switch, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  createVehicle,
  updateFormField,
  updateLocationField,
  resetForm,
  selectCreateVehicleFormData,
  selectCreateVehicleLoading,
  selectCreateVehicleError,
  selectCreateVehicleSuccess,
} from '../../store/slices/createVehicleSlice';

const CreateVehicle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors
  const formData = useSelector(selectCreateVehicleFormData);
  const loading = useSelector(selectCreateVehicleLoading);
  const error = useSelector(selectCreateVehicleError);
  const success = useSelector(selectCreateVehicleSuccess);

  // Effects
  useEffect(() => {
    // Reset form when component mounts
    dispatch(resetForm());
  }, [dispatch]);

  useEffect(() => {
    // Navigate back to list on success
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  // Event handlers
  const handleBack = () => {
    navigate('/');
  };

  const handleFormChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleLocationChange = (field, value) => {
    dispatch(updateLocationField({ field, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vehicleData = {
      licensePlate: formData.licensePlate,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      status: formData.status,
      lastService: formData.lastService,
      odometer: parseInt(formData.odometer),
      location: {
        lat: parseFloat(formData.locationLat),
        lng: parseFloat(formData.locationLng)
      },
      gpsActive: formData.gpsActive
    };
    
    dispatch(createVehicle(vehicleData));
  };

  return (
    <Container>
      <FormCard>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Title>Registrar nuevo vehículo</Title>
        </Box>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Placa"
            value={formData.licensePlate}
            onChange={(e) => handleFormChange('licensePlate', e.target.value)}
            required
            fullWidth
          />
          
          <InputField
            label="Marca"
            value={formData.make}
            onChange={(e) => handleFormChange('make', e.target.value)}
            required
            fullWidth
          />
          
          <InputField
            label="Modelo"
            value={formData.model}
            onChange={(e) => handleFormChange('model', e.target.value)}
            required
            fullWidth
          />
          
          <InputField
            label="Año"
            type="number"
            value={formData.year}
            onChange={(e) => handleFormChange('year', e.target.value)}
            required
            fullWidth
          />
          
          <StatusSelect
            value={formData.status}
            onChange={(e) => handleFormChange('status', e.target.value)}
            fullWidth
          >
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
            <MenuItem value="En servicio">En servicio</MenuItem>
            <MenuItem value="Taller">Taller</MenuItem>
          </StatusSelect>
          
          <InputField
            label="Último servicio"
            type="date"
            value={formData.lastService}
            onChange={(e) => handleFormChange('lastService', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          
          <InputField
            label="Kilometraje"
            type="number"
            value={formData.odometer}
            onChange={(e) => handleFormChange('odometer', e.target.value)}
            required
            fullWidth
          />
          
          <LocationContainer>
            <LocationField
              label="Latitud"
              type="number"
              value={formData.locationLat}
              onChange={(e) => handleLocationChange('lat', e.target.value)}
              required
              fullWidth
            />
            <LocationField
              label="Longitud"
              type="number"
              value={formData.locationLng}
              onChange={(e) => handleLocationChange('lng', e.target.value)}
              required
              fullWidth
            />
          </LocationContainer>
          
          <SwitchContainer>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.gpsActive}
                  onChange={(e) => handleFormChange('gpsActive', e.target.checked)}
                />
              }
              label="GPS Activo"
            />
          </SwitchContainer>

          <SubmitButton
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </SubmitButton>

          {error && <ErrorText>{error}</ErrorText>}
        </form>
      </FormCard>
    </Container>
  );
};

export default CreateVehicle;