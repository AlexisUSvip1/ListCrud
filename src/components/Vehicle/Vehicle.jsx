import React, { useState } from 'react';
import useVehicles from './Vehicle.hook';
import { 
  Container, 
  Input, 
  FilterSelect, 
  TableStyled, 
  ButtonStyled, 
  ButtonContainer,
  FloatingAddButton
} from './Vehicle.styles';
import { MenuItem, TableHead, TableRow, TableCell, TableBody, Box, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para redirección
import { Add } from '@mui/icons-material'; // Importar el ícono de "+"
import NoData from '../../utils/NoData';

const VehicleList = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState('placa');  // Nuevo estado para seleccionar el tipo de búsqueda
  const navigate = useNavigate();  // Inicializar el hook de navegación

  // Traemos los vehículos con la paginación y filtros aplicados
  const vehicles = useVehicles(search, statusFilter, page, searchType);

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  // Función para manejar el clic en una fila
  const handleRowClick = (id) => {
    navigate(`/vehicles/${id}`);  // Redirige al detalle del vehículo con el ID correspondiente
  };

  // Función para manejar el clic en el botón flotante
  const handleAddVehicle = () => {
    navigate('/vehicles/new');  // Redirige a la página de crear vehículo
  };

  return (
    <Container>
      {/* Barra de búsqueda */}
      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <FormControl fullWidth>
          <InputLabel>Buscar por</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            label="Buscar por"
          >
            <MenuItem value="placa">Placa</MenuItem>
            <MenuItem value="marca">Marca</MenuItem>
            <MenuItem value="modelo">Modelo</MenuItem>
          </Select>
        </FormControl>

        <Input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder={`Buscar por ${searchType}`}
          variant="outlined"
          fullWidth
        />
      </Box>

      {/* Filtro de estado */}
      <FilterSelect
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)} 
        variant="outlined"
      >
        <MenuItem value="Todos">Todos</MenuItem>
        <MenuItem value="Disponible">Disponible</MenuItem>
        <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
        <MenuItem value="En servicio">En servicio</MenuItem>
        <MenuItem value="Taller">Taller</MenuItem>
      </FilterSelect>

      {/* Tabla de vehículos */}
      <TableStyled>
        <TableHead>
          <TableRow>
            <TableCell>Placa</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <NoData />
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id} 
                onClick={() => handleRowClick(vehicle.id)}  // Añadir el manejador de clic
                sx={{
                  cursor: 'pointer',  // Cambiar el cursor para indicar que es clickeable
                  '&:hover': {
                    backgroundColor: '#f5f5f5',  // Color de fondo en hover
                  },
                }}
              >
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableStyled>

      {/* Paginación */}
      <ButtonContainer>
        <ButtonStyled 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}  // Deshabilitar si estamos en la primera página
          variant="outlined"
        >
          Anterior
        </ButtonStyled>
        <ButtonStyled 
          onClick={() => handlePageChange(page + 1)} 
          variant="outlined"
        >
          Siguiente
        </ButtonStyled>
      </ButtonContainer>

      {/* Botón flotante para agregar vehículo */}
      <FloatingAddButton
        color="primary"
        aria-label="Agregar vehículo"
        onClick={handleAddVehicle}
      >
        <Add />
      </FloatingAddButton>
    </Container>
  );
};

export default VehicleList;