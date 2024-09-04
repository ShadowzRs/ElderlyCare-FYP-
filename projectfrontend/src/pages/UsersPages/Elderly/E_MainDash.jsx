import React from "react";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import "./E_MainDash.css";

const E_MainDash = () => {
  const mainLinks = [
    {
      to: "/elderly-home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/elderly-chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/elderly-chatbot",
      title: "AI Chatbot",
      icon: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png",
    },
    {
      to: "/elderly-med_reminder",
      title: "Reminder",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/elderly-appointment",
      title: "Appointment",
      icon: "https://cdn-icons-png.flaticon.com/128/6946/6946547.png",
    },
  ];

  const bottomLink = {
    to: "/elderly-settings",
    title: "Setting",
    icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
  };

  return (
    <>
      <div className="e-maindash-container">
        <aside className="flex">
          <Sidebar mainLinks={mainLinks} bottomLink={bottomLink} />
        </aside>

        <h1>THis is elderly page</h1>
      </div>
    </>
  );
};

export default E_MainDash;
