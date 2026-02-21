import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import Vehicles from "./pages/Vehicles";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddVehicle from "./pages/owner/AddVehicle";
import ManageVehicles from "./pages/owner/ManageVehicles";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-100 transition-colors duration-300">
      <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="manage-vehicles" element={<ManageVehicles />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;