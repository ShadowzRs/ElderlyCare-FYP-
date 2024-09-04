import React from "react";
import { Link, useLocation } from "react-router-dom";
import small_logo from "../../assets/AI-LifeConnect_Logo-small.png";
import "./Sidebar.css";

const Sidebar = ({ mainLinks, bottomLink }) => {
  const location = useLocation(); // Get the current location
  const isActive = (path) => location.pathname === path;

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

        {bottomLink && (
          <Link
            to={bottomLink.to}
            title={bottomLink.title}
            className={`sd-icon-button ${
              isActive(bottomLink.to) ? "active" : ""
            }`}
          >
            <img
              src={bottomLink.icon}
              alt={bottomLink.title}
              style={{ width: "25px", height: "25px" }}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
