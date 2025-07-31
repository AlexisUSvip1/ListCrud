import { useState } from 'react';
import axios from 'axios';

const useCreateVehicle = (onSuccess) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('Disponible');
  const [lastService, setLastService] = useState('');
  const [odometer, setOdometer] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [gpsActive, setGpsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newVehicle = {
        licensePlate,
        make,
        model,
        year: parseInt(year),
        status,
        lastService,
        odometer: parseInt(odometer),
        location: {
          lat: parseFloat(locationLat),
          lng: parseFloat(locationLng)
        },
        gpsActive
      };
      
      await axios.post('http://localhost:3001/vehicles', newVehicle);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('No se pudo registrar el vehículo.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useCreateVehicle;
