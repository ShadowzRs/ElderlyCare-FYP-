import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";

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
      {user ? (
        <div className="medDash-container">
          <aside className="flex">
            {user.role === "Elderly" && location.pathname === "/med" && (
              <Sidebar mainLinks={ElderlyLinks} />
            )}
            {user.role === "Caregiver" && location.pathname === "/med" && (
              <Sidebar mainLinks={CaregiverLinks} />
            )}
          </aside>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access Medication Reminder"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default MedPage;
