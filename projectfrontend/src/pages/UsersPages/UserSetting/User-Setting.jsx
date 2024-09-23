import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import { getUserById } from "../ChatPage/Service/MessageService.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import "./User-Setting.css";

export const RefreshContext = createContext();

const UserSetting = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [view_UserData, setView_UserData] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          // Fetch user data
          const userInfo = await getUserById(user.id);
          setUserData(userInfo);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleOnView = (type) => {
    if (type === "User") {
      setView_UserData(!view_UserData);
    }
  };

  return (
    <>
      {user ? (
        <div className="Setting-container">
          <aside className="flex">
            {user.role === "Elderly" && location.pathname === "/settings" && (
              <Sidebar mainLinks={ElderlyLinks} />
            )}
            {user.role === "Doctor" && location.pathname === "/settings" && (
              <Sidebar mainLinks={DoctorLinks} />
            )}
            {user.role === "Caregiver" && location.pathname === "/settings" && (
              <Sidebar mainLinks={CaregiverLinks} />
            )}
          </aside>

          <div className="settingSection">
            <div className="s-Header">
              <h1 className="s-Heading">Account settings</h1>
            </div>

            <div className="s-Content">
              <div className="s-Card">
                <h2 className="s-Title">User Data</h2>
                <p className="s-Desc">Personal Information</p>
                <button onClick={() => handleOnView("User")}>
                  {view_UserData ? (
                    <img
                      className="s-arrow"
                      title="Hide"
                      src="https://cdn-icons-png.flaticon.com/128/3838/3838683.png"
                    />
                  ) : (
                    <img
                      className="s-arrow"
                      title="Show"
                      src="https://cdn-icons-png.flaticon.com/128/2722/2722987.png"
                    />
                  )}
                </button>
              </div>

              {view_UserData && (
                <div className="bg-white">
                  <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          First Name
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.firstname || "N/A"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Last Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.lastname || "N/A"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Email</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.email || "N/A"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Age</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.age ? `${userData.age} Years Old` : "N/A"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Gender</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.gender || "N/A"}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          Contact Number
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {userData.phonenumber || "N/A"}
                        </dd>
                      </div>
                      {(user.role === "Doctor" || user.role === "Caregiver") &&
                        location.pathname === "/settings" && (
                          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">
                              Healthcare Provider Role:
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                              {userData.role || "N/A"}
                            </dd>
                          </div>
                        )}
                    </dl>
                  </div>
                </div>
              )}

              <div className="s-Card">
                <h2 className="s-Title">Feedback</h2>
                <p className="s-Desc">
                  Enjoying AI-Life Connect? Share your feedback in a quick
                  survey to help us improve!
                </p>

                <button
                  className="s-SurveyButton"
                  onClick={() =>
                    window.open("https://forms.gle/6pHnxQk92hFY76aL8", "_blank")
                  }
                >
                  Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access Setting"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default UserSetting;
