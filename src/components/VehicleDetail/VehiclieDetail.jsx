import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useVehicleDetail from './VehicleDetail.hook';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    vehicle,
    loading,
    updating,
    deleting,
    error,
    handleStatusChange,
    handleDelete,
  } = useVehicleDetail(id, navigate);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!vehicle) return <div className="p-4">Vehículo no encontrado.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Detalle del vehículo</h2>
      <div className="mb-4">
        <p><strong>Placa:</strong> {vehicle.plate}</p>
        <p><strong>Marca:</strong> {vehicle.brand}</p>
        <p><strong>Modelo:</strong> {vehicle.model}</p>
        <p><strong>Año:</strong> {vehicle.year}</p>
        <p><strong>Estado:</strong> {vehicle.status}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleStatusChange('Disponible')}
          disabled={updating || vehicle.status === 'Disponible'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Marcar como Disponible
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Eliminar vehículo
        </button>
      </div>
    </div>
  );
};

export default VehicleDetail;
