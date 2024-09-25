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
import "./Med_ReminderPage.css";

export const RefreshContext = createContext();

const MedPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [reminders, setReminders] = useState([]);

  const ElderlyLinks = [
    {
      to: "/chatbot",
      title: "AI-Chatbot",
      icon: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png",
    },
    {
      to: "/chats",
      title: "Chats",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/reminder",
      title: "Reminders",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/healthRecord",
      title: "Health Records",
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
      title: "Chats",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/reminder",
      title: "Reminders",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/healthRecord",
      title: "Health Records",
      icon: "https://cdn-icons-png.flaticon.com/128/4039/4039062.png",
    },
    {
      to: "/settings",
      title: "Setting",
      icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
    },
  ];

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hoursIn12HourFormat = hours % 12 || 12; // Convert to 12-hour format
    const ampm = hours < 12 ? "AM" : "PM"; // AM/PM
    return `${hoursIn12HourFormat}:${minutes} ${ampm}`;
  };

  const handleDeleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/reminders/${id}`);
      // Remove the deleted reminder from the local state
      setReminders(reminders.filter((reminder) => reminder.id !== id));
      alert("Reminder deleted successfully!");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      alert("There was an error deleting the reminder.");
    }
  };

  const handleClick = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowList(false);
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

  const handleUserSelect = async (
    selectedUserId,
    selectedFirstName,
    selectedLastName
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reminders/${selectedUserId}`
      );

      setReminders(response.data);

      setShowList(false);
      setSearchQuery(`${selectedFirstName} ${selectedLastName}`);
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
          const response = await axios.get(
            `http://localhost:8080/api/reminders/${user.id}`
          );

          setReminders(response.data);
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

  const isCreatePage = location.pathname.includes("new-reminder");

  return (
    <>
      {!isCreatePage && (
        <>
          {user ? (
            <div className="Reminder-container">
              <aside className="flex">
                {user.role === "Elderly" &&
                  location.pathname === "/reminder" && (
                    <Sidebar mainLinks={ElderlyLinks} />
                  )}
                {user.role === "Caregiver" &&
                  location.pathname === "/reminder" && (
                    <Sidebar mainLinks={CaregiverLinks} />
                  )}
              </aside>

              <div className="Reminder-Section">
                <div className="Reminder-Header">
                  <h1 className="Reminder-Heading">
                    Medication & Schedule Reminder
                  </h1>
                </div>

                {user.role === "Caregiver" &&
                  location.pathname === "/reminder" && (
                    <div className="Reminder-search-container">
                      <input
                        type="text"
                        id="Search"
                        placeholder="Search Elderly User"
                        className="Reminder-user-search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowList(true)}
                        autoComplete="off"
                      />
                      <div className="Reminder-search-logo">
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
                        <ul className="Reminder-search-results" ref={listRef}>
                          {filteredUsers.length > 0
                            ? filteredUsers
                                .sort((a, b) =>
                                  a.firstname.localeCompare(b.firstname)
                                )
                                .map((user) => (
                                  <li
                                    key={user.id}
                                    onClick={() =>
                                      handleUserSelect(
                                        user.id,
                                        user.firstname,
                                        user.lastname
                                      )
                                    }
                                  >
                                    {user.firstname} {user.lastname}
                                  </li>
                                ))
                            : searchQuery && <li>User is Not Found</li>}
                        </ul>
                      )}
                    </div>
                  )}

                <div className="Reminder-Content">
                  <div className="Reminder-tab-Title">
                    <h2>--- Current Active Reminder ---</h2>
                    {user.role === "Elderly" &&
                      location.pathname === "/reminder" && (
                        <button
                          className="Reminder-button"
                          onClick={() => navigate(`new-reminder`)}
                        >
                          New Reminder
                        </button>
                      )}
                  </div>

                  {reminders.length > 0 ? (
                    reminders.map((activeReminder, index) => (
                      <div
                        key={index}
                        className="max-w-full bg-white rounded-xl shadow-md overflow-hidden mb-4"
                      >
                        <div className="flex flex-row justify-between p-6">
                          <div>
                            <div className="tracking-wide text-base text-indigo-500 font-semibold">
                              {new Date(
                                activeReminder.reminderDate
                              ).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>

                            <p className="block mt-1 text-xl leading-tight font-medium text-black">
                              {activeReminder.reminderType === "appointment"
                                ? "Appointment Reminder"
                                : "Medicine Reminder"}
                            </p>
                            <p className="mt-2 text-gray-500 font-medium">
                              Time: {formatTime(activeReminder.time)}
                            </p>
                            <p className="mt-2 text-gray-500">
                              {activeReminder.notes}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              className={`px-2 py-2 border border-transparent text-sm font-normal rounded-md text-white ${
                                user.role === "Elderly"
                                  ? "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  : "bg-gray-400 cursor-not-allowed" // Styling for disabled button
                              }`}
                              onClick={
                                user.role === "Elderly"
                                  ? () =>
                                      handleDeleteReminder(activeReminder.id)
                                  : null
                              }
                              disabled={user.role !== "Elderly"} // Disable button if role is not Elderly
                            >
                              Cancel Reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400">
                        No Active Reminder Currently
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
              message="Invalid Authentication Credentials to Access Reminder"
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
