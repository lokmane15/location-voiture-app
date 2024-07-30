import {Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import Users from './pages/Users';
import Reservation from './pages/Reservation';
import Layout from './components/Layout';
import AddCar from './form/AddCar';
import UpdateCar from './form/UpdateCar';

function App() {
  return (
      <div className="app">
        <Routes>
          <Route element={<Layout/>}>
            <Route index  element={<Dashboard />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reservation" element={<Reservation />} />            
            <Route path="/addcar" element={<AddCar />} />            
            <Route path="/updatecar/:id" element={<UpdateCar />} />            
          </Route>
        </Routes>
      </div>
  );
}

export default App;
