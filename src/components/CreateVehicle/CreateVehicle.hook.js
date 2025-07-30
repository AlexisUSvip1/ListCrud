import { useState } from 'react';
import axios from 'axios';

const useCreateVehicle = (onSuccess) => {
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('Disponible');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newVehicle = { plate, brand, model, year, status };
      await axios.post('http://localhost:3001/vehicles', newVehicle);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('No se pudo registrar el vehículo.');
    } finally {
      setLoading(false);
    }
  };

  return {
    plate, setPlate,
    brand, setBrand,
    model, setModel,
    year, setYear,
    status, setStatus,
    handleSubmit,
    loading,
    error,
  };
};

export default useCreateVehicle;
