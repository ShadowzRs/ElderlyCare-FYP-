import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/AI-LifeConnect_Logo.png";
import "./Header-v2.css";

const Header_v2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="Register-Header">
      <div className="Register-Header-Content">
        <Link to="/">
          <img src={logo} alt="AI-LifeConnect" className="Register-Logo" />
        </Link>

        <div className="Register-Header-Button">
          <button
            className={`Register-Header-Login-Button ${isActive("/login")}`}
            type="button"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </button>

          <button
            className={`Register-Header-Register-Button ${isActive(
              "/register"
            )}`}
            type="button"
            onClick={() => handleNavigation("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header_v2;
