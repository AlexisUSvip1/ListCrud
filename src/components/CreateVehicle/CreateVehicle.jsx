import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateVehicle from './CreateVehicle.hook';

const CreateVehicle = () => {
  const navigate = useNavigate();

  const {
    plate, setPlate,
    brand, setBrand,
    model, setModel,
    year, setYear,
    status, setStatus,
    handleSubmit,
    loading,
    error,
  } = useCreateVehicle(() => navigate('/'));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar nuevo vehículo</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Placa"
          required
          className="border p-2"
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Marca"
          required
          className="border p-2"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Modelo"
          required
          className="border p-2"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Año"
          required
          className="border p-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="Disponible">Disponible</option>
          <option value="En mantenimiento">En mantenimiento</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CreateVehicle;
