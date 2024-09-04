import React from "react";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";

const C_MainDash = () => {
  const mainLinks = [
    {
      to: "/caregiver-home",
      title: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/2948/2948025.png",
    },
    {
      to: "/caregiver-chat",
      title: "Chat",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
  ];

  const bottomLink = {
    to: "/caregiver-settings",
    title: "Setting",
    icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
  };

  return (
    <>
      <div className="c-maindash-container">
        <aside className="flex">
          <Sidebar mainLinks={mainLinks} bottomLink={bottomLink} />
        </aside>

        <h1>THIS IS THE CAREGIVER MAIN DASHBOARD</h1>
      </div>
    </>
  );
};

export default C_MainDash;
