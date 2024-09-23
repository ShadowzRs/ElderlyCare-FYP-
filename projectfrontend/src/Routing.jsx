import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

import ChatPage from "./pages/UsersPages/ChatPage/ChatPage.jsx";
import AIChatbot from "./pages/UsersPages/ChatBotPage/ChatBotPage.jsx";
import Reminder from "./pages/UsersPages/MedReminderPage/Med_ReminderPage.jsx";
import ElderlyMedRecord from "./pages/UsersPages/MedicalRecordPage/MedicalRecordPage.jsx";
import Modify_Add from "./pages/UsersPages/MedicalRecordPage/Service/Modify_AddData.jsx";
import Setting from "./pages/UsersPages/UserSetting/User-Setting.jsx";

function Routing() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/chats" element={<ChatPage role={user?.role} />} />
        <Route path="/chatbot" element={<AIChatbot role={user?.role} />} />
        <Route path="/med" element={<Reminder role={user?.role} />} />
        <Route
          path="/healthRecord/*"
          element={<ElderlyMedRecord role={user?.role} />}
        >
          <Route path="modify-add" element={<Modify_Add />} />
        </Route>
        <Route path="/settings" element={<Setting role={user?.role} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
