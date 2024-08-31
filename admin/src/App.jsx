import { Routes, Route, Navigate } from "react-router-dom";
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
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { admin, loginAdmin } = useAuth();

  useEffect(() => {
    const adminFormLocalStorage = JSON.parse(localStorage.getItem("admin"));
    if (adminFormLocalStorage) {
      loginAdmin(adminFormLocalStorage);
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route element={admin ? <Layout /> : <Navigate to="/login" />}>
          <Route
            index
            element={admin ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/cars"
            element={admin ? <Cars /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={admin ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/reservation"
            element={admin ? <Reservation /> : <Navigate to="/login" />}
          />
          <Route
            path="/addcar"
            element={admin ? <AddCar /> : <Navigate to="/login" />}
          />
          <Route
            path="/updatecar/:id"
            element={admin ? <UpdateCar /> : <Navigate to="/login" />}
          />
          <Route
            path="/marque"
            element={admin ? <Marque /> : <Navigate to="/login" />}
          />
          <Route
            path="/addmarque"
            element={admin ? <AddMarque /> : <Navigate to="/login" />}
          />
          <Route
            path="/updatemarque/:id"
            element={admin ? <UpdateMarque /> : <Navigate to="/login" />}
          />
          <Route
            path="/model"
            element={admin ? <Model /> : <Navigate to="/login" />}
          />
          <Route
            path="/addmodel"
            element={admin ? <AddModel /> : <Navigate to="/login" />}
          />
          <Route
            path="/updatemodel/:id"
            element={admin ? <UpdateModel /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/login"
          element={!admin ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
