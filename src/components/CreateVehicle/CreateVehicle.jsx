import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateVehicle from './CreateVehicle.hook';
import { 
  Container, 
  Title, 
  InputField, 
  StatusSelect, 
  SubmitButton, 
  ErrorText,
  LocationContainer,
  LocationField,
  SwitchContainer
} from './CreateVehicle.styles';
import { MenuItem, FormControlLabel, Switch } from '@mui/material';

const CreateVehicle = () => {
  const navigate = useNavigate();

  const {
    licensePlate, setLicensePlate,
    make, setMake,
    model, setModel,
    year, setYear,
    status, setStatus,
    lastService, setLastService,
    odometer, setOdometer,
    locationLat, setLocationLat,
    locationLng, setLocationLng,
    gpsActive, setGpsActive,
    handleSubmit,
    loading,
    error,
  } = useCreateVehicle(() => navigate('/'));

  return (
    <Container>
      <Title>Registrar nuevo vehículo</Title>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Placa"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
          fullWidth
        />
        
        <InputField
          label="Marca"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
          fullWidth
        />
        
        <InputField
          label="Modelo"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          fullWidth
        />
        
        <InputField
          label="Año"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          fullWidth
        />
        
        <StatusSelect
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
          value={lastService}
          onChange={(e) => setLastService(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        
        <InputField
          label="Kilometraje"
          type="number"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
          required
          fullWidth
        />
        
        <LocationContainer>
          <LocationField
            label="Latitud"
            type="number"
            value={locationLat}
            onChange={(e) => setLocationLat(e.target.value)}
            required
            fullWidth
          />
          <LocationField
            label="Longitud"
            type="number"
            value={locationLng}
            onChange={(e) => setLocationLng(e.target.value)}
            required
            fullWidth
          />
        </LocationContainer>
        
        <SwitchContainer>
          <FormControlLabel
            control={
              <Switch
                checked={gpsActive}
                onChange={(e) => setGpsActive(e.target.checked)}
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
    </Container>
  );
};

export default CreateVehicle;