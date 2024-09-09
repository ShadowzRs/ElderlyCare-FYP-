import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

import ChatPage from "./pages/UsersPages/ChatPage/ChatPage.jsx";
import AIChatbot from "./pages/UsersPages/ChatBotPage/ChatBotPage.jsx";
import MedPage from "./pages/UsersPages/MedReminderPage/Med_ReminderPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirect if false
  }

  return children; // Allow access true
};

function Routing() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <ChatPage role={user?.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <AIChatbot role={user?.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/med"
          element={
            <ProtectedRoute>
              <MedPage role={user?.role} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
