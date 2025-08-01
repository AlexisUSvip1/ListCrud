import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import VehicleList from './components/Vehicle/Vehicle';
import VehicleDetail from './components/VehicleDetail/VehiclieDetail';
import CreateVehicle from './components/CreateVehicle/CreateVehicle';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/vehicles/new" element={<CreateVehicle />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
