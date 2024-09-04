import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

import ElderlyMainDash from "./pages/UsersPages/Elderly/E_MainDash.jsx";
import ElderlyChatPage from "./pages/UsersPages/Elderly/E_ChatPage.jsx";

import CaregiverMainDash from "./pages/UsersPages/Caregiver/C_MainDash.jsx";

import HealthProfMainDash from "./pages/UsersPages/HealthcareProf/H_MainDash.jsx";

function routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/elderly-home" element={<ElderlyMainDash />} />
        <Route path="/elderly-chat" element={<ElderlyChatPage />} />

        <Route path="/caregiver-home" element={<CaregiverMainDash />} />

        <Route path="/doctor-home" element={<HealthProfMainDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routing;
