import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../component/Header/Header.jsx";
import FeatureCard from "./FeatureCard.jsx";
import logo from "../../assets/AI-LifeConnect_Logo.png";
import Slogans from "../../assets/Slogans_Logo.svg";
import imgPlaceHolder from "../../assets/ImagePlaceHolder.svg";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <>
      <Header />

      {/* ======================================================================================================================================================================= */}

      <section className="Landing_Main_Body">
        <div className="Landing_Main_Body_filter"></div>

        <div className="Landing_Main_Body_Container">
          <div className="Landing_Main_Body_Content">
            <div className="Landing_Main_Body_Slogans_Container">
              <h2 className="Landing_Main_Body_Slogans_Content">
                Elderly Health Matters
              </h2>

              <img src={Slogans} alt="Slogans-Logo" className="Slogans-logo" />
            </div>

            <h1 className="Landing_Main_Body_Title">Helping Hands</h1>

            <p className="Landing_Main_Body_text">
              Our mission is to provide compassionate care and support for the
              elderly!
            </p>

            <button
              className="Landing_Main_Body_Button"
              type="button"
              onClick={() => handleNavigation("/register")}
            >
              Get Started with AI-LifeConnect
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================  ===================================================================================================== */}

      <section className="Landing_Feature_Body">
        <div className="Landing_Feature_Header">
          <h1 className="Landing_Feature_Title">Features We Provide</h1>
        </div>

        <div className="Landing_Feature_Container">
          <div className="Landing_Feature_Content">
            <FeatureCard
              title="24/7 Support"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
              imageUrl={imgPlaceHolder}
            />
            <FeatureCard
              title="24/7 Support"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
              imageUrl={imgPlaceHolder}
            />
          </div>

          <div className="Landing_Feature_Content">
            <FeatureCard
              title="24/7 Support"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
              imageUrl={imgPlaceHolder}
            />
            <FeatureCard
              title="24/7 Support"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
              imageUrl={imgPlaceHolder}
            />
          </div>
        </div>
      </section>

      {/* ======================================================================================================================================================================= */}

      <footer className="Landing_footer">
        <div className="Landing_footer_Container">
          <div className="Landing_footer-left">
            <img
              src={logo}
              alt="AI-LifeConnect"
              className="footer_logo-image"
            />

            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="social-icons">
              <Link to="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          <div className="Landing_footer-right">
            <h3>Get the latest news!</h3>
            <p>
              Stay informed! Enter your email to receive important news and
              updates about our elderly care services.
            </p>
            <form className="subscribe-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" onClick={() => handleNavigation("#")}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="Landing_footer-bottom">
          <p>Copyright © 2022</p>
          <div className="Landing_footer-links">
            <Link to="#">All Rights Reserved</Link>
            <Link to="#">Terms and Conditions</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
