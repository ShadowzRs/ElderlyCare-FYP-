import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import small_logo from "../../assets/AI-LifeConnect_Logo-small.png";
import Notification from "../Notification/Notification.jsx";
import { UserContext } from "../../UserContext.jsx";
import "./Sidebar.css";

const Sidebar = ({ mainLinks }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useContext(UserContext);
  const [notification, setNotification] = useState(null);
  const isActive = (path) => location.pathname === path;

  const showNotification = (message1, message2) => {
    setNotification({ message1, message2 });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleLogout = () => {
    showNotification(
      "Successfully Logout",
      "You have been successfully logged out. See you soon!!"
    );
    setTimeout(() => {
      logoutUser();
      navigate("/");
    }, 3000);
  };

  return (
    <div className="sd-container">
      <Link to="/" className="pb-[35px]">
        <img className="w-auto h-7" src={small_logo} alt="logo" />
      </Link>

      <div className="sd-icon-container">
        <div className="sd-main-container">
          {mainLinks.map((link, index) => (
            <Link
              to={link.to}
              title={link.title}
              className={`sd-icon-button ${isActive(link.to) ? "active" : ""}`}
              key={index} 
            >
              <img
                src={link.icon}
                alt={link.title}
                style={{ width: "25px", height: "25px" }}
              />
            </Link>
          ))}
        </div>

        <Link
          onClick={handleLogout}
          title="Logout"
          className="sd-icon-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828427.png"
            alt="Logout"
            style={{ width: "25px", height: "25px" }}
          />
        </Link>
      </div>
      {notification && (
        <Notification
          message1={notification.message1}
          message2={notification.message2}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Sidebar;
