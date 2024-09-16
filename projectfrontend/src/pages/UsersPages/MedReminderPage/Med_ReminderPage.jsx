import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";

import "./Med_ReminderPage.css";

const MedPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  
  const ElderlyLinks = [
    {
      to: "/chats",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/chatbot",
      title: "AI Chatbot",
      icon: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png",
    },
    {
      to: "/med",
      title: "Medication",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/appointment",
      title: "Appointment",
      icon: "https://cdn-icons-png.flaticon.com/128/6946/6946547.png",
    },
    {
      to: "/settings",
      title: "Setting",
      icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
    },
  ];

  const CaregiverLinks = [
    {
      to: "/chats",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/med",
      title: "Medication",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/healthRecord",
      title: "Health Record",
      icon: "https://cdn-icons-png.flaticon.com/128/4039/4039062.png",
    },
    {
      to: "/settings",
      title: "Setting",
      icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
    },
  ];

  return (
    <>
      <div className="maindash-container">
        <aside className="flex">
          {user ? (
            <>
              {user.role === "Elderly" && location.pathname === "/med" && (
                <Sidebar mainLinks={ElderlyLinks} />
              )}
              {user.role === "Caregiver" && (
                <Sidebar mainLinks={CaregiverLinks} />
              )}
            </>
          ) : (
            <p>Please log in to access the features.</p>
          )}
        </aside>
      </div>
    </>
  );
};

export default MedPage;
