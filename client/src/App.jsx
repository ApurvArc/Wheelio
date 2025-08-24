import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import Vehicles from "./pages/Vehicles";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <div>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicles-details/:id' element={<VehicleDetails />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/my-bookings' element={<MyBookings />} />
      </Routes>

      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
