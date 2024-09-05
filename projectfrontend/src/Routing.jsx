import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

import MainPage from "./pages/UsersPages/MainHome/MainDash.jsx";
import ChatPage from "./pages/UsersPages/ChatPage/ChatPage.jsx";
import AIChatbot from "./pages/UsersPages/ChatBotPage/ChatBotPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Allow access if user is authenticated
};

function Routing() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes based on role */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainPage role={user?.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage role={user?.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AIchatbot"
          element={
            <ProtectedRoute>
              <AIChatbot role={user?.role} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
