import React from "react";
import "./Footer.css"; // Adjust the path according to your file structure
import logo from "../../assets/AI-LifeConnect_Logo.png";

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="footer-container mx-auto sm:px-6 lg:px-8">
        <div className="footer-inner sm:flex">
          <div>
            <img src={logo} alt="AI-LifeConnect" className="logo-image" />
          </div>
          <p className="footer-text lg:footer-text-lg">
            All Rights Reserved | Terms and Conditions | Privacy Policy
          </p>
          <p className="footer-text lg:footer-text-lg">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
