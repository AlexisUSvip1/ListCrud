# Fleet Tracker - Sistema de Gestión de Vehículos

Una aplicación React para gestionar una flota de vehículos con funcionalidades de CRUD completas.

## Características

- ✅ Lista de vehículos con paginación
- ✅ Búsqueda por placa, marca o modelo
- ✅ Filtrado por estado
- ✅ Detalle completo de vehículos
- ✅ **Edición completa de vehículos con modal reutilizable**
- ✅ Eliminación de vehículos
- ✅ Actualización en tiempo real de la tabla
- ✅ **Modal reutilizable para múltiples propósitos**

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

## Uso

### 1. Iniciar el servidor JSON (API)
```bash
npm run server
```
Esto iniciará json-server en el puerto 3001 usando el archivo `bd.json` como base de datos.

### 2. Iniciar la aplicación React
```bash
npm start
```
La aplicación se abrirá en http://localhost:3000

## Funcionalidades de Edición

### Modal de Edición
- **Botón "Editar vehículo"**: Abre un modal con todos los campos editables
- **Campos editables**:
  - Placa
  - Marca
  - Modelo
  - Año
  - Estado (Disponible, En mantenimiento, En servicio, Taller)
  - Último servicio (fecha)
  - Kilometraje
  - Ubicación (Latitud y Longitud)
  - Estado GPS (Switch on/off)

### Actualización Automática
- Al guardar cambios en el modal, la tabla principal se actualiza automáticamente
- Los cambios se reflejan inmediatamente en la interfaz

## Modal Reutilizable

### Componente: `src/utils/Modal.jsx`

El modal reutilizable permite crear diferentes tipos de modales con el mismo componente base.

#### Props Disponibles:
- `open`: Boolean - Controla si el modal está abierto
- `onClose`: Function - Función llamada al cerrar el modal
- `title`: String - Título del modal
- `children`: ReactNode - Contenido del modal
- `onSave`: Function - Función llamada al guardar
- `onCancel`: Function - Función llamada al cancelar (opcional)
- `saveText`: String - Texto del botón guardar (default: "Guardar")
- `cancelText`: String - Texto del botón cancelar (default: "Cancelar")
- `loading`: Boolean - Estado de carga (default: false)
- `maxWidth`: String - Tamaño máximo del modal (default: "md")
- `fullWidth`: Boolean - Si el modal debe ocupar todo el ancho (default: true)

#### Ejemplos de Uso:

```jsx
// Modal simple
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Título del Modal"
  onSave={() => console.log('Guardado')}
>
  <Typography>Contenido del modal</Typography>
</Modal>

// Modal con formulario
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Formulario"
  onSave={handleSave}
  loading={isLoading}
  saveText="Enviar"
>
  <TextField label="Campo" />
</Modal>

// Modal de confirmación
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar"
  onSave={handleConfirm}
  saveText="Eliminar"
  cancelText="Cancelar"
  maxWidth="sm"
>
  <Typography>¿Estás seguro?</Typography>
</Modal>
```

### Componente: `src/utils/VehicleEditForm.jsx`

Formulario específico para edición de vehículos que se puede usar dentro del modal reutilizable.

#### Props:
- `formData`: Object - Datos del formulario
- `onFormChange`: Function - Maneja cambios en campos normales
- `onLocationChange`: Function - Maneja cambios en campos de ubicación

## Estructura del Proyecto

```
src/
├── components/
│   ├── Vehicle/           # Lista de vehículos
│   ├── VehicleDetail/     # Detalle y edición de vehículos
│   └── CreateVehicle/     # Creación de vehículos
├── utils/
│   ├── Modal.jsx         # Modal reutilizable
│   ├── VehicleEditForm.jsx # Formulario de edición de vehículos
│   ├── ModalExamples.jsx # Ejemplos de uso del modal
│   └── NoData.jsx        # Componente para datos vacíos
└── App.js                # Componente principal con rutas
```

## API Endpoints

- `GET /vehicles` - Obtener lista de vehículos
- `GET /vehicles/:id` - Obtener vehículo específico
- `PUT /vehicles/:id` - Actualizar vehículo
- `DELETE /vehicles/:id` - Eliminar vehículo
- `POST /vehicles` - Crear nuevo vehículo

## Tecnologías Utilizadas

- React 19
- Material-UI
- Axios para HTTP requests
- React Router para navegación
- JSON Server para API mock