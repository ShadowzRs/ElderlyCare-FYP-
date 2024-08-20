import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header_v2 from "../../component/Header/Header-v2.jsx";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="Register-background">
      <div className="Register-background-v2">
        <Header_v2 />
        <section className="Register-Section">
          <div className="Register-Message-Container">
            <h1>Join Us Today !</h1>
            <h2>Our Community for Quality Elderly Care</h2>
            <p>
              If you already have an account, you can{" "}
              <Link className="Register-Message-p" to="/login">
                Login here!
              </Link>
            </p>
          </div>

          <div className="Register-Container">
            <h1>Welcome User</h1>
            <div className="Register-Input-Container">
              {/* ============= FULL NAME ============= */}
              <div className="Register-Display">
                <div className="Register-Items">
                  <label
                    htmlFor="ElderlyFirstN"
                    className="Register-Input-Label"
                  >
                    {" "}
                    First Name{" "}
                  </label>

                  <input
                    type="text"
                    id="ElderlyFirstN"
                    className="Register-Input-Box"
                  />
                </div>

                <div className="Register-Items">
                  <label
                    htmlFor="ElderlyLastN"
                    className="Register-Input-Label"
                  >
                    {" "}
                    Last Name{" "}
                  </label>

                  <input
                    type="text"
                    id="ElderlyLastN"
                    className="Register-Input-Box"
                  />
                </div>
              </div>

              {/* ============= EMAIL ============= */}

              <div>
                <label htmlFor="ElderlyEmail" className="Register-Input-Label">
                  {" "}
                  Email Address{" "}
                </label>

                <input
                  type="email"
                  id="ElderlyEmail"
                  className="Register-Input-Box"
                />
              </div>

              {/* ============= PASSWORD ============= */}
              <div className="Register-Display">
                <div className="Register-Items">
                  <label htmlFor="ElderlyPass" className="Register-Input-Label">
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="ElderlyPass"
                    className="Register-Input-Box"
                  />
                </div>
                <div className="Register-Items">
                  <label
                    htmlFor="ElderlyPassConfirm"
                    className="Register-Input-Label"
                  >
                    {" "}
                    Password Confimation{" "}
                  </label>

                  <input
                    type="password"
                    id="ElderlyPassConfirm"
                    className="Register-Input-Box"
                  />
                </div>
              </div>

              {/* ============= AGE & GENDER ============= */}
              <div className="Register-Display">
                <div className="Register-Items-Age">
                  <label htmlFor="ElderlyAge" className="Register-Input-Label">
                    {" "}
                    Age{" "}
                  </label>

                  <input
                    type="text"
                    id="ElderlyAge"
                    maxLength="3"
                    className="Register-Input-Box"
                  />
                </div>

                <div className="Register-Items">
                  <label
                    htmlFor="ElderlyGender"
                    className="Register-Input-Label"
                  >
                    {" "}
                    Gender{" "}
                  </label>
                  <select
                    id="ElderlyGender"
                    className="Register-Input-Box"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="Register-Items">
                  <label htmlFor="ElderlyContact" className="Register-Input-Label">
                    {" "}
                    Phone Number{" "}
                  </label>

                  <input
                    type="tel"
                    id="ElderlyContact"
                    className="Register-Input-Box"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  />
                </div>
              </div>
            </div>

            {/* <Link to="/" className="Register-Issues">Having Problem ?</Link> */}
            <div className="Register-Button-Container">
              <button
                type="submit"
                className="Register-Button"
                onClick={() => handleNavigation("/home")}
              >
                Register New User
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
