import React, { useContext } from "react";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { UserContext } from "../../../UserContext.jsx";
import "./MainDash.css";

const MainDash = () => {
  const { user } = useContext(UserContext);
  const ElderlyLinks = [
    {
      to: "/home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/AIchatbot",
      title: "AI Chatbot",
      icon: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png",
    },
    {
      to: "/med_reminder",
      title: "Reminder",
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

  const DoctorLinks = [
    {
      to: "/home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
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
      to: "/home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/settings",
      title: "Setting",
      icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
    },
  ];

  const bottomLink = {
    to: "/login",
    title: "Logout",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828427.png",
  };

  return (
    <>
      <div className="maindash-container">
        <aside className="flex">
          {user ? (
            <>
              {user.role === "Elderly" && (
                <Sidebar mainLinks={ElderlyLinks} bottomLink={bottomLink} />
              )}
              {user.role === "Doctor" && (
                <Sidebar mainLinks={DoctorLinks} bottomLink={bottomLink} />
              )}
              {user.role === "Caregiver" && (
                <Sidebar mainLinks={CaregiverLinks} bottomLink={bottomLink} />
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

export default MainDash;
