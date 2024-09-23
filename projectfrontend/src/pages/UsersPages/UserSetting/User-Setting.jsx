import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import { getUserById } from "../ChatPage/Service/MessageService.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import axios from "axios";

import "./User-Setting.css";

export const RefreshContext = createContext();

const UserSetting = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [MedicalAllergies, setMedicalAllergies] = useState({
    medicationAllergies: [],
    foodAllergies: [],
    environmentalAllergies: [],
  });

  const [view_UserData, setView_UserData] = useState(false);
  const [view_MedData, setview_MedData] = useState(false);
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

          // Fetch medical histories
          const responseHistory = await axios.get(
            `http://localhost:8080/api/medical-history/${user.id}`
          );

          setMedicalHistories(responseHistory.data);

          const responseAllergy = await axios.get(
            `http://localhost:8080/api/medical-allergies/${user.id}`
          );

          const allergyData = responseAllergy.data;

          const fetchedMedAllergies = allergyData.medicationAllergies
            ? allergyData.medicationAllergies
                .split(",")
                .map((item) => item.trim())
            : [];
          const fetchedFoodAllergies = allergyData.foodAllergies
            ? allergyData.foodAllergies.split(",").map((item) => item.trim())
            : [];
          const fetchedEnvAllergies = allergyData.environmentalAllergies
            ? allergyData.environmentalAllergies
                .split(",")
                .map((item) => item.trim())
            : [];

          // Update state
          setMedicalAllergies({
            medicationAllergies: fetchedMedAllergies,
            foodAllergies: fetchedFoodAllergies,
            environmentalAllergies: fetchedEnvAllergies,
          });
          setRefresh(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, refresh]);

  const handleOnView = (type) => {
    if (type === "User") {
      setView_UserData(!view_UserData);
    } else if (type === "Med") {
      setview_MedData(!view_MedData);
    }
  };

  const isModifyPage = location.pathname.includes("modify-add");

  return (
    <>
      {!isModifyPage && (
        <>
          {user ? (
            <div className="Setting-container">
              <aside className="flex">
                {user.role === "Elderly" &&
                  location.pathname === "/settings" && (
                    <Sidebar mainLinks={ElderlyLinks} />
                  )}
                {user.role === "Doctor" &&
                  location.pathname === "/settings" && (
                    <Sidebar mainLinks={DoctorLinks} />
                  )}
                {user.role === "Caregiver" &&
                  location.pathname === "/settings" && (
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
                            <dt className="font-medium text-gray-900">
                              Last Name
                            </dt>
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
                              {userData.age
                                ? `${userData.age} Years Old`
                                : "N/A"}
                            </dd>
                          </div>

                          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">
                              Gender
                            </dt>
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
                          {(user.role === "Doctor" ||
                            user.role === "Caregiver") &&
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

                  {/* Medical History-Record */}
                  {user.role === "Elderly" &&
                    location.pathname === "/settings" && (
                      <div className="s-Card">
                        <h2 className="s-Title">Medical Record</h2>
                        <p className="s-Desc">
                          Medical History, Allegries, Medication
                        </p>

                        <button onClick={() => handleOnView("Med")}>
                          {view_MedData ? (
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
                    )}

                  {view_MedData && (
                    <>
                      <div className="s-tab-Title">
                        <h2>Medical History</h2>
                        <div className="s-tab-button-Container">
                          <button
                            className="s-tab-button"
                            onClick={() =>
                              navigate(`modify-add?type=medicalhistory`)
                            }
                          >
                            Add New
                          </button>
                        </div>
                      </div>
                      {medicalHistories.length > 0 ? (
                        medicalHistories.map((history, index) => (
                          <div key={index}>
                            <div className="bg-white">
                              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                      Previous Illnesses
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                      {history.illness || "No data available"}
                                    </dd>
                                  </div>

                                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                      Surgeries
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                      {history.surgeries || "No data available"}
                                    </dd>
                                  </div>

                                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                      Date
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                      {history.date || "No data available"}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-400">
                            No Medical History Records as of Today
                          </p>
                        </div>
                      )}

                      <div className="s-tab-Title">
                        <h2>Allegries Record</h2>
                        <div className="s-tab-button-Container">
                          <button
                            className="s-tab-button"
                            onClick={() => {
                              const hasAllergies =
                                MedicalAllergies.medicationAllergies.length >
                                  0 ||
                                MedicalAllergies.foodAllergies.length > 0 ||
                                MedicalAllergies.environmentalAllergies.length >
                                  0;

                              navigate(
                                hasAllergies
                                  ? `modify-add?type=allergiesrecordupdate` // Update
                                  : `modify-add?type=allergiesrecord` // Add New
                              );
                            }}
                          >
                            {MedicalAllergies.medicationAllergies.length > 0 ||
                            MedicalAllergies.foodAllergies.length > 0 ||
                            MedicalAllergies.environmentalAllergies.length > 0
                              ? "Update"
                              : "Add New"}
                          </button>
                        </div>
                      </div>

                      {MedicalAllergies.medicationAllergies.length > 0 ||
                      MedicalAllergies.foodAllergies.length > 0 ||
                      MedicalAllergies.environmentalAllergies.length > 0 ? (
                        <div className="bg-white">
                          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                  Medication Allergies
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                  {MedicalAllergies.medicationAllergies.length >
                                  0
                                    ? MedicalAllergies.medicationAllergies.join(
                                        ", "
                                      )
                                    : "None"}
                                </dd>
                              </div>

                              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                  Food Allergies
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                  {MedicalAllergies.foodAllergies.length > 0
                                    ? MedicalAllergies.foodAllergies.join(", ")
                                    : "None"}
                                </dd>
                              </div>

                              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                  Environmental Allergies
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                  {MedicalAllergies.environmentalAllergies
                                    .length > 0
                                    ? MedicalAllergies.environmentalAllergies.join(
                                        ", "
                                      )
                                    : "None"}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-400">
                            No Medical History Records as of Today
                          </p>
                        </div>
                      )}
                    </>
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
                        window.open(
                          "https://forms.gle/6pHnxQk92hFY76aL8",
                          "_blank"
                        )
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
      )}
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <Outlet />
      </RefreshContext.Provider>
    </>
  );
};

export default UserSetting;
