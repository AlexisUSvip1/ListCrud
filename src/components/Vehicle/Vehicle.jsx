import React, { useState } from 'react';
import useVehicles from './Vehicle.hook';

const VehicleList = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [page, setPage] = useState(1);

  const vehicles = useVehicles(search, statusFilter, page);

  return (
    <div className="container mx-auto">
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Buscar por placa, marca o modelo"
        className="border p-2 mb-4"
      />

      <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)} 
        className="border p-2 mb-4"
      >
        <option value="Todos">Todos</option>
        <option value="Disponible">Disponible</option>
        <option value="En mantenimiento">En mantenimiento</option>
      </select>

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.plate}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
          className="px-4 py-2 border disabled:opacity-50"
        >
          Anterior
        </button>
        <button 
          onClick={() => setPage((prev) => prev + 1)} 
          className="px-4 py-2 border"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default VehicleList;
