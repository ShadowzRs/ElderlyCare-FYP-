import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Header from "../../component/Header/Header.jsx";
import FeatureCard from "./FeatureCard.jsx";
import logo from "../../assets/AI-LifeConnect_Logo.png";
import Slogans from "../../assets/Slogans_Logo.svg";
import Illustrator from "../../assets/Health professional team-amico.svg";
import ChatImg from "../../assets/Group Chat-pana.svg";
import ServiceImg from "../../assets/Service 24_7-amico.svg";
import Chatbotimg from "../../assets/Chat bot-amico.svg";
import ReminderImg from "../../assets/Reminders-pana.svg";

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log(`Subscribed with email: ${email}`);
    alert("Thank you for subscribing! Check your inbox for updates.");
    setEmail("");
  };

  return (
    <>
      <Header />

      {/* ======================================================================================================================================================================= */}

      <section className="Landing_Main_Body">
        <div className="Landing_Main_Body_Container">
          <div className="Landing_Main_Body_Content">
            <div className="Landing_Main_Body_Slogans_Container">
              <h2 className="Landing_Main_Body_Slogans_Content">
                Elderly Health Matters
              </h2>

              <img src={Slogans} alt="Slogans-Logo" className="Slogans-logo" />
            </div>

            <h1 className="Landing_Main_Body_Title">
              Caring Companions, Dedicated to Supporting the Elderly
            </h1>

            <p className="Landing_Main_Body_text">
              our mission is to deliver heartfelt care and unwavering support to
              the elderly, ensuring they live their golden years with dignity
              and joy.
            </p>

            <button
              className="Landing_Main_Body_Button"
              type="button"
              onClick={() => navigate("/register")}
            >
              Start Your Journey
            </button>
          </div>

          <div className="Landing_Main_Body_Illustrator">
            <img src={Illustrator} alt="Elderly-Illustrator" />
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
              title="Real Time Engagement"
              text="Stay connected with loved ones and healthcare providers through instant messaging"
              imageUrl={ChatImg}
            />
            <FeatureCard
              title="24/7 Support"
              text="Full time support for any urgent queries or needed support"
              imageUrl={ServiceImg}
            />
          </div>

          <div className="Landing_Feature_Content">
            <FeatureCard
              title="AI-Powered Chatbot Assistance"
              text="Get responses to health-related questions or any personalized guidance at any given time"
              imageUrl={Chatbotimg}
            />
            <FeatureCard
              title="Appointment & Med Reminders"
              text="Never miss an important appointment or medication again with our reminders"
              imageUrl={ReminderImg}
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
              Enhancing elderly care with innovative technology and
              compassionate support for a brighter future
            </p>
            <div className="social-icons">
              <div className="social-icons-img">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="social-icons-img">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="social-icons-img">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="social-icons-img">
                <i className="fab fa-linkedin-in"></i>
              </div>
              <div className="social-icons-img">
                <i className="fab fa-youtube"></i>
              </div>
            </div>
          </div>

          <div className="Landing_footer-right">
            <h3>Get the latest news!</h3>
            <p>
              Stay informed! Enter your email to receive important news and
              updates about our elderly care services.
            </p>
            <form className="subscribe-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="Landing_footer-bottom">
          <p>Copyright © 2022</p>
          <div className="Landing_footer-links">
            <h2>All Rights Reserved</h2>
            <h2>Terms and Conditions</h2>
            <h2>Privacy Policy</h2>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
