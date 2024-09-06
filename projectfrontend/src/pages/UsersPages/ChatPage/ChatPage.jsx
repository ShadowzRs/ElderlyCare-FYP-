import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { UserContext } from "../../../UserContext.jsx";
import "./ChatPage.css";

const ChatPage = () => {
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

  return (
    <>
      <div className="cp-section">
        <aside className="flex">
          {user ? (
            <>
              {user.role === "Elderly" && location.pathname === "/chat" && (
                <>
                  <Sidebar mainLinks={ElderlyLinks} />
                  <div className="cp-container">
                    <div className="cp-search-container">
                      <label htmlFor="Search" className="sr-only">
                        {" "}
                        Search{" "}
                      </label>

                      <input
                        type="text"
                        id="Search"
                        placeholder="Search"
                        className="cp-search"
                      />

                      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <span className="sr-only">Search</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="black"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                          </svg>
                        </button>
                      </span>
                    </div>

                    <h2 className="cp-container-header">Accounts</h2>

                    <div className="cp-user-list-container">
                      <button className="cp-user-profile">
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                          alt=""
                        />

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Mia John</h1>

                          <p className="cp-user-desc">11.2 Followers</p>
                        </div>
                      </button>

                      <button className="cp-user-profile">
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80"
                          alt=""
                        />

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">arthur melo</h1>

                          <p className="cp-user-desc">1.2 Followers</p>
                        </div>
                      </button>

                      <button className="cp-user-profile">
                        <div className="relative">
                          <img
                            className="object-cover w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
                            alt=""
                          />
                        </div>

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Jane Doe</h1>

                          <p className="cp-user-desc">15.6 Followers</p>
                        </div>
                      </button>

                      <button className="cp-user-profile">
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=80"
                          alt=""
                        />

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Amelia. Anderson</h1>

                          <p className="cp-user-desc">32.9 Followers</p>
                        </div>
                      </button>

                      <button className="cp-user-profile">
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
                          alt=""
                        />

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Joseph Gonzalez</h1>

                          <p className="cp-user-desc">100.2 Followers</p>
                        </div>
                      </button>

                      <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                        <div className="relative">
                          <img
                            className="object-cover w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&h=1470&q=80"
                            alt=""
                          />
                        </div>

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Olivia Wathan</h1>

                          <p className="cp-user-desc">8.6 Followers</p>
                        </div>
                      </button>

                      <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                        <div className="relative">
                          <img
                            className="object-cover w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1608174386344-80898cec6beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
                            alt=""
                          />
                        </div>

                        <div className="cp-user-label-container">
                          <h1 className="cp-user-name">Junior REIS</h1>

                          <p className="cp-user-desc">56.6 Followers</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
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

export default ChatPage;
