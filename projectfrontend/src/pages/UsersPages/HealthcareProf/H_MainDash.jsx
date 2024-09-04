import React, { useState } from "react";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { Link, useNavigate } from "react-router-dom";
import "./H_MainDash.css";

const H_MainDash = () => {
  const mainLinks = [
    {
      to: "/doctor-home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/doctor-chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/doctor-appointment",
      title: "Appointment",
      icon: "https://cdn-icons-png.flaticon.com/128/6946/6946547.png",
    },
  ];

  const bottomLink = {
    to: "/doctor-settings",
    title: "Setting",
    icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
  };

  return (
    <>
      <div className="h-maindash-container">
        <aside className="flex">
          <Sidebar mainLinks={mainLinks} bottomLink={bottomLink} />
        </aside>

        <h1>THIS IS THE DOCTOR MAIN DASHBOARD</h1>
      </div>
    </>
  );
};

export default H_MainDash;
