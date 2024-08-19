import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Users from "./pages/Users";
import Reservation from "./pages/Reservation";
import Layout from "./components/Layout";
import AddCar from "./form/AddCar";
import UpdateCar from "./form/UpdateCar";
import Marque from "./pages/Marque";
import Model from "./pages/Model";
import AddMarque from "./form/AddMarque";
import UpdateMarque from "./form/UpdateMarque";
import AddModel from "./form/AddModel";
import UpdateModel from "./form/UpdateModel";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/updatecar/:id" element={<UpdateCar />} />
          <Route path="/marque" element={<Marque />} />
          <Route path="/addmarque" element={<AddMarque />} />
          <Route path="/updatemarque/:id" element={<UpdateMarque />} />
          <Route path="/model" element={<Model />} />
          <Route path="/addmodel" element={<AddModel />} />
          <Route path="/updatemodel/:id" element={<UpdateModel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
