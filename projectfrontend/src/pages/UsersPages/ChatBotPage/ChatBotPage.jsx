import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { UserContext } from "../../../UserContext.jsx";
import "./ChatBotPage.css";

const ChatBotPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

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

  const bottomLink = {
    to: "/login",
    title: "Logout",
    icon: "https://cdn-icons-png.flaticon.com/128/1828/1828427.png",
  };

  return (
    <>
      <div className="chatbot-container">
        <aside className="flex">
          {user ? (
            <>
              {user.role === "Elderly" &&
                location.pathname === "/AIchatbot" && (
                  <>
                    <Sidebar mainLinks={ElderlyLinks} bottomLink={bottomLink} />
                  </>
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

export default ChatBotPage;
