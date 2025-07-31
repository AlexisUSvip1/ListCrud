import { useState } from 'react';
import { vehicleService, triggerVehicleUpdate } from '../../utils/api';

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
      
      await vehicleService.createVehicle(newVehicle);
      triggerVehicleUpdate();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
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
