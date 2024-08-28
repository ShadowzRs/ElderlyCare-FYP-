import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

import ElderlyMainDash from "./pages/UsersPages/Elderly/ElderlyMainDash.jsx";
import CaregiverMainDash from "./pages/UsersPages/Caregiver/CaregiverMainDash.jsx";
import HealthProfMainDash from "./pages/UsersPages/HealthcareProf/HealthProfMainDash.jsx";

function routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/elderly" element={<ElderlyMainDash />} />
        <Route path="/caregiver" element={<CaregiverMainDash />} />
        <Route path="/doctor" element={<HealthProfMainDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routing;
