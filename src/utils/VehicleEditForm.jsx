import React from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormField = styled(TextField)`
  margin-bottom: 16px;
  width: 100%;
`;

const FormSelect = styled(FormControl)`
  margin-bottom: 16px;
  width: 100%;
`;

const SelectStatus = styled(Select)`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
`;

const LocationContainer = styled(Box)`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const LocationField = styled(TextField)`
  flex: 1;
`;

const VehicleEditForm = ({ 
  formData, 
  onFormChange, 
  onLocationChange 
}) => {
  return (
    <>
      <FormField
        label="Placa"
        value={formData.licensePlate || ''}
        onChange={(e) => onFormChange('licensePlate', e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <FormField
        label="Marca"
        value={formData.make || ''}
        onChange={(e) => onFormChange('make', e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <FormField
        label="Modelo"
        value={formData.model || ''}
        onChange={(e) => onFormChange('model', e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <FormField
        label="Año"
        type="number"
        value={formData.year || ''}
        onChange={(e) => onFormChange('year', parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />
      
      <FormSelect fullWidth margin="normal">
        <InputLabel>Estado</InputLabel>
        <SelectStatus
          value={formData.status || ''}
          onChange={(e) => onFormChange('status', e.target.value)}
          label="Estado"
        >
          <MenuItem value="Disponible">Disponible</MenuItem>
          <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
          <MenuItem value="En servicio">En servicio</MenuItem>
          <MenuItem value="Taller">Taller</MenuItem>
        </SelectStatus>
      </FormSelect>
      
      <FormField
        label="Último servicio"
        type="date"
        value={formData.lastService || ''}
        onChange={(e) => onFormChange('lastService', e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      
      <FormField
        label="Kilometraje"
        type="number"
        value={formData.odometer || ''}
        onChange={(e) => onFormChange('odometer', parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />
      
      <LocationContainer>
        <LocationField
          label="Latitud"
          type="number"
          value={formData.location?.lat || ''}
          onChange={(e) => onLocationChange('lat', e.target.value)}
          margin="normal"
        />
        <LocationField
          label="Longitud"
          type="number"
          value={formData.location?.lng || ''}
          onChange={(e) => onLocationChange('lng', e.target.value)}
          margin="normal"
        />
      </LocationContainer>
      
      <FormControlLabel
        control={
          <Switch
            checked={formData.gpsActive || false}
            onChange={(e) => onFormChange('gpsActive', e.target.checked)}
          />
        }
        label="GPS Activo"
      />
    </>
  );
};

export default VehicleEditForm; 