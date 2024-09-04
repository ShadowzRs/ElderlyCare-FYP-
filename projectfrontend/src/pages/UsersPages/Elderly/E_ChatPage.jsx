import React from "react";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import "./E_ChatPage.css";

const E_ChatPage = () => {
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
      <div className="e-chatpage-container">
        <aside className="flex">
          <Sidebar mainLinks={mainLinks} bottomLink={bottomLink} />

          <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
            <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
              Accounts
            </h2>

            <div className="mt-8 space-y-4">
              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                  alt=""
                />

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Mia John
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    11.2 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80"
                  alt=""
                />

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    arthur melo
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1.2 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                <div className="relative">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
                    alt=""
                  />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                </div>

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Jane Doe
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    15.6 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=80"
                  alt=""
                />

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Amelia. Anderson
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    32.9 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
                  alt=""
                />

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Joseph Gonzalez
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    100.2 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                <div className="relative">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&h=1470&q=80"
                    alt=""
                  />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                </div>

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Olivia Wathan
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    8.6 Followers
                  </p>
                </div>
              </button>

              <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                <div className="relative">
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1608174386344-80898cec6beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&h=687&q=80"
                    alt=""
                  />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                </div>

                <div className="text-left rtl:text-right">
                  <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                    Junior REIS
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    56.6 Followers
                  </p>
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default E_ChatPage;
