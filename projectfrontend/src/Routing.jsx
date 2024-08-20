import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import MainDash from "./pages/Dashboard/MainDash.jsx";

import StudentTest from "./pages/StudentTest.jsx";

function routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<MainDash />} />

        <Route path="/test" element={<StudentTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routing;
