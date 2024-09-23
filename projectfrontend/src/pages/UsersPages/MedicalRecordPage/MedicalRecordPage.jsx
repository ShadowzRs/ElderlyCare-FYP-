import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";

import "./MedicalRecordPage.css";

const DisplayRecordPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const DoctorLinks = [
    {
      to: "/chats",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
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
        <div className="medRecordDash-container">
          <aside className="flex">
            {user.role === "Doctor" &&
              location.pathname === "/healthRecord" && (
                <Sidebar mainLinks={DoctorLinks} />
              )}
            {user.role === "Caregiver" &&
              location.pathname === "/healthRecord" && (
                <Sidebar mainLinks={CaregiverLinks} />
              )}
          </aside>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access Health Record"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default DisplayRecordPage;
