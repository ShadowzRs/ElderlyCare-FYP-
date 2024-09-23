import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import "./Med_ReminderPage.css";

export const RefreshContext = createContext();

const MedPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

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

  const isCreatePage = location.pathname.includes("new-reminder");

  return (
    <>
      {!isCreatePage && (
        <>
          {user ? (
            <div className="Reminder-container">
              <aside className="flex">
                {user.role === "Elderly" && location.pathname === "/med" && (
                  <Sidebar mainLinks={ElderlyLinks} />
                )}
                {user.role === "Caregiver" && location.pathname === "/med" && (
                  <Sidebar mainLinks={CaregiverLinks} />
                )}
              </aside>

              <div className="Reminder-Section">
                <div className="Reminder-Header">
                  <h1 className="Reminder-Heading">
                    Medication & Schedule Reminder
                  </h1>
                </div>

                <div className="Reminder-Content">
                  <div className="Reminder-tab-Title">
                    <h2>--- Current Active Reminder ---</h2>

                    <button
                      className="Reminder-button"
                      onClick={() => navigate(`new-reminder`)}
                    >
                      New Reminder
                    </button>
                  </div>

                  <div className="max-w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-row	justify-between p-6">
                      <div>
                        <div className="tracking-wide text-base text-indigo-500 font-semibold">
                          18 September 2024
                        </div>
                        <p className="block mt-1 text-xl leading-tight font-medium text-black">
                          Appointment Reminder
                        </p>
                        <p className="mt-2 text-gray-500 font-medium">
                          Time: 01:00 PM
                        </p>
                        <p className="mt-2 text-gray-500">
                          Appointment with Dr. Allan for routine check-up
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button className="px-2 py-2 border border-transparent text-sm font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Cancel Reminder
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-row	justify-between p-6">
                      <div>
                        <div className="tracking-wide text-base text-indigo-500 font-semibold">
                          18 September 2024
                        </div>
                        <p className="block mt-1 text-xl leading-tight font-medium text-black">
                          Medicine Reminder
                        </p>
                        <p className="mt-2 text-gray-500 font-medium">
                          Time: 09:00 AM
                        </p>
                        <p className="mt-2 text-gray-500">
                          Take 1 tablet of Lisinopril (10mg) for blood pressure
                          control before breakfast.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button className="px-2 py-2 border border-transparent text-sm font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Cancel Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      )}
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <Outlet />
      </RefreshContext.Provider>
    </>
  );
};

export default MedPage;
