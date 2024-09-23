import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import axios from "axios";
import "./MedicalRecordPage.css";

export const RefreshContext = createContext();

const extractAllergies = (allergyData, type) =>
  allergyData[type]
    ? allergyData[type].split(",").map((item) => item.trim())
    : [];

const DisplayRecordPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [refresh, setRefresh] = useState(false);

  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [medicalHistories, setMedicalHistories] = useState([]);
  const [MedicalAllergies, setMedicalAllergies] = useState({
    medicationAllergies: [],
    foodAllergies: [],
    environmentalAllergies: [],
  });

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

  const handleClick = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowList(false);
      setSearchQuery("");
      setFilteredUsers([]);
    }
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      // Reset if empty
      setFilteredUsers([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/elderly/users", {
        params: { search: query },
      });
      console.log(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserSelect = async (selectedUserId) => {
    try {
      // Fetch medical history and allergies concurrently
      const [responseHistory, responseAllergy] = await Promise.all([
        axios.get(
          `http://localhost:8080/api/medical-history/${selectedUserId}`
        ),
        axios.get(
          `http://localhost:8080/api/medical-allergies/${selectedUserId}`
        ),
      ]);

      const allergyData = responseAllergy.data;

      // Use helper function to extract allergies
      const fetchedMedAllergies = extractAllergies(
        allergyData,
        "medicationAllergies"
      );
      const fetchedFoodAllergies = extractAllergies(
        allergyData,
        "foodAllergies"
      );
      const fetchedEnvAllergies = extractAllergies(
        allergyData,
        "environmentalAllergies"
      );

      // Update state
      setMedicalHistories(responseHistory.data);
      setMedicalAllergies({
        medicationAllergies: fetchedMedAllergies,
        foodAllergies: fetchedFoodAllergies,
        environmentalAllergies: fetchedEnvAllergies,
      });

      setShowList(false);
      setSearchQuery("");
      setFilteredUsers([]);
    } catch (error) {
      console.error("Error handling user selection:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      if (user.role === "Elderly") {
        try {
          // Fetch medical history and allergy data concurrently
          const [responseHistory, responseAllergy] = await Promise.all([
            axios.get(`http://localhost:8080/api/medical-history/${user.id}`),
            axios.get(`http://localhost:8080/api/medical-allergies/${user.id}`),
          ]);

          const allergyData = responseAllergy.data;

          // Use helper function to extract allergies
          setMedicalHistories(responseHistory.data);
          setMedicalAllergies({
            medicationAllergies: extractAllergies(
              allergyData,
              "medicationAllergies"
            ),
            foodAllergies: extractAllergies(allergyData, "foodAllergies"),
            environmentalAllergies: extractAllergies(
              allergyData,
              "environmentalAllergies"
            ),
          });

          setRefresh(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, refresh]);

  useEffect(() => {
    if (user?.role === "Doctor" || user?.role === "Caregiver") {
      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [user]);

  const isModifyPage = location.pathname.includes("modify-add");

  return (
    <>
      {!isModifyPage && (
        <>
          {user ? (
            <div className="medRecordDash-container">
              <aside className="flex">
                {user.role === "Elderly" &&
                  location.pathname === "/healthRecord" && (
                    <Sidebar mainLinks={ElderlyLinks} />
                  )}
                {user.role === "Doctor" &&
                  location.pathname === "/healthRecord" && (
                    <Sidebar mainLinks={DoctorLinks} />
                  )}
                {user.role === "Caregiver" &&
                  location.pathname === "/healthRecord" && (
                    <Sidebar mainLinks={CaregiverLinks} />
                  )}
              </aside>

              <div className="medSection">
                <div className="medHis-Header">
                  <h1 className="medHis-Heading">Medical Record</h1>
                </div>

                {(user.role === "Doctor" ||
                  (user.role === "Caregiver" &&
                    location.pathname === "/healthRecord")) && (
                  <div className="med-search-container">
                    <input
                      type="text"
                      id="Search"
                      placeholder="Search Elderly User"
                      className="med-user-search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setShowList(true)}
                      autoComplete="off"
                    />
                    <div className="med-search-logo">
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
                    </div>

                    {showList && (
                      <ul className="med-search-results" ref={listRef}>
                        {filteredUsers.length > 0
                          ? filteredUsers
                              .sort((a, b) =>
                                a.firstname.localeCompare(b.firstname)
                              )
                              .map((user) => (
                                <li
                                  key={user.id}
                                  onClick={() => handleUserSelect(user.id)}
                                >
                                  {user.firstname} {user.lastname}
                                </li>
                              ))
                          : searchQuery && <li>User is Not Found</li>}
                      </ul>
                    )}
                  </div>
                )}

                <div className="medHis-Content">
                  <div className="medHis-tab-Title">
                    <h2> --- Medical History --- </h2>
                    {user.role === "Elderly" &&
                      location.pathname === "/healthRecord" && (
                        <div className="medHis-tab-button-Container">
                          <button
                            className="medHis-tab-button"
                            onClick={() =>
                              navigate(`modify-add?type=medicalhistory`)
                            }
                          >
                            Add New
                          </button>
                        </div>
                      )}
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

                  <div className="medHis-tab-Title">
                    <h2>--- Allegries Record ---</h2>
                    {user.role === "Elderly" &&
                      location.pathname === "/healthRecord" && (
                        <div className="medHis-tab-button-Container">
                          <button
                            className="medHis-tab-button"
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
                      )}
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
                              {MedicalAllergies.medicationAllergies.length > 0
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
                              {MedicalAllergies.environmentalAllergies.length >
                              0
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
                </div>
              </div>
            </div>
          ) : (
            <ErrorPage
              errorCode="401"
              title="Unauthorized Access!"
              message="Invalid Authentication Credentials to Access Health Record"
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

export default DisplayRecordPage;
