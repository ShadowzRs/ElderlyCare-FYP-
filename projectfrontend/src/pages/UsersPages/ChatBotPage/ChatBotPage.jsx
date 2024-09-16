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

  return (
    <>
      <div className="chatbot-container">
        <aside className="flex">
          {user ? (
            <>
              {user.role === "Elderly" && location.pathname === "/chatbot" && (
                <>
                  <Sidebar mainLinks={ElderlyLinks} />
                </>
              )}
            </>
          ) : (
            <p>Please log in to access the features.</p>

            // <div className="grid h-screen place-content-center bg-white px-4">
            //   <div className="text-center">
            //     <h1 className="text-9xl font-black text-gray-200">401</h1>

            //     <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            //       Uh-oh!
            //     </p>

            //     <p className="mt-4 text-gray-500">unauthorized</p>

            //     <Link
            //       to="/"
            //       className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            //     >
            //       Go Back Home
            //     </Link>
            //   </div>
            // </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default ChatBotPage;
