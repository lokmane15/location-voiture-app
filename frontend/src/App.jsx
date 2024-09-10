import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Cars from "./page/Cars";
import Login from "./page/Login";
import Signup from "./page/Signup";

import useAuthContext from "./hooks/useAuthContext";
import CarDetails from "./page/CarDetails";
import Reserve from "./page/Reserve";
import Payment from "./page/Payment";
import Success from "./page/Success";
import Contrat from "./page/Contrat";
import Cancel from "./page/Cancel";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutUs from "./page/AboutUs";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/carDetails/:id"
            element={user ? <CarDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/reserve/:id"
            element={user ? <Reserve /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment/:id"
            element={user ? <Payment /> : <Navigate to="/login" />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route
            path="/contrat"
            element={user ? <Contrat /> : <Navigate to="/login" />}
          />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
