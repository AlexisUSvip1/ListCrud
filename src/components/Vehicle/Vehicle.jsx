import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Input, 
  FilterSelect, 
  TableStyled, 
  ButtonStyled, 
  ButtonContainer,
  FloatingAddButton
} from './Vehicle.styles';
import { MenuItem, TableHead, TableRow, TableCell, TableBody, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import NoData from '../../utils/NoData';
import { 
  fetchAllVehicles,
  reloadVehicles,
  setSearch,
  setStatusFilter,
  setCurrentPage,
  selectFilteredAndPaginatedVehicles,
  selectVehiclesLoading,
  selectVehiclesError,
  selectSearch,
  selectStatusFilter,
  selectCurrentPage,
} from '../../store/slices/vehiclesSlice';

const VehicleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const { vehicles, totalCount, totalPages } = useSelector(selectFilteredAndPaginatedVehicles);
  const loading = useSelector(selectVehiclesLoading);
  const error = useSelector(selectVehiclesError);
  const search = useSelector(selectSearch);
  const statusFilter = useSelector(selectStatusFilter);
  const currentPage = useSelector(selectCurrentPage);

  // Effects
  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, [dispatch]);

  useEffect(() => {
    const handleVehicleUpdate = () => {
      dispatch(reloadVehicles());
    };

    window.addEventListener('vehicleUpdated', handleVehicleUpdate);
    return () => {
      window.removeEventListener('vehicleUpdated', handleVehicleUpdate);
    };
  }, [dispatch]);

  // Event handlers
  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleStatusFilterChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  const handleRowClick = (id) => {
    navigate(`/vehicles/${id}`);
  };

  const handleAddVehicle = () => {
    navigate('/vehicles/new');
  };

  return (
    <Container>
      {/* Barra de búsqueda y filtros */}
      <Box sx={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Buscar por placa, marca o modelo..."
          variant="outlined"
          fullWidth
        />
        
        <FilterSelect
          value={statusFilter} 
          onChange={handleStatusFilterChange} 
          variant="outlined"
          sx={{ minWidth: { xs: '100%', md: '200px' } }}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Disponible">Disponible</MenuItem>
          <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
          <MenuItem value="En servicio">En servicio</MenuItem>
          <MenuItem value="Taller">Taller</MenuItem>
        </FilterSelect>
      </Box>

      {/* Mostrar error si existe */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Mostrar loading o tabla */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tabla de vehículos */}
          <Box sx={{ 
            overflowX: 'auto',
            '& .MuiTable-root': {
              minWidth: { xs: 400, sm: 600 }
            }
          }}>
            <TableStyled>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '12px', sm: '14px' }
                  }}>
                    Placa
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '12px', sm: '14px' }
                  }}>
                    Marca
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '12px', sm: '14px' }
                  }}>
                    Modelo
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '12px', sm: '14px' }
                  }}>
                    Año
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '12px', sm: '14px' }
                  }}>
                    Estado
                  </TableCell>
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
                      onClick={() => handleRowClick(vehicle.id)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                        {vehicle.licensePlate}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                        {vehicle.make}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                        {vehicle.model}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                        {vehicle.year}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                        {vehicle.status}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TableStyled>
          </Box>

          {/* Paginación */}
          <ButtonContainer>
            <ButtonStyled 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              variant="outlined"
            >
              Anterior
            </ButtonStyled>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              fontSize: { xs: '12px', sm: '14px' }
            }}>
              <span>Página {currentPage} de {totalPages}</span>
              <span>({totalCount} vehículos total)</span>
            </Box>
            
            <ButtonStyled 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage >= totalPages}
              variant="outlined"
            >
              Siguiente
            </ButtonStyled>
          </ButtonContainer>
        </>
      )}

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