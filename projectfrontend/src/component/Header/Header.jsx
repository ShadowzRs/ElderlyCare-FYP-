import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/AI-LifeConnect_Logo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <header className="Landing_Header">
      <div className="Landing_Header_Container">
        <div className="Landing_Header_Content">
          <Link to="/">
            <img src={logo} alt="AI-LifeConnect" className="logo-image" />
          </Link>

          <div className="Landing_Header_Button">
            <button
              className="Landing_Login_button"
              type="button"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>

            <button
              className="Landing_Register_button"
              type="button"
              onClick={() => handleNavigation("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
