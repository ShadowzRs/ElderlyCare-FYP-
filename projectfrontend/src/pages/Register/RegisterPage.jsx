import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/AI-LifeConnect_Logo.png";
import RegisterImg from "../../assets/Online Doctor-rafiki-B.svg";
import Header_v2 from "../../component/Header/Header-v2.jsx";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (route) => {
    navigate(route);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="Register-Section">
      <div className="Register-Left-Container">
        <img src={RegisterImg} className="Register-Img" />
        <div className="R-Font">
          <h1>Join Us Today !</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>
      </div>

      <div className="Register-Container">
        <div>
          <img src={logo} alt="AI-LifeConnect" className="Register-Logo" />
        </div>

        <div className="Register-Content">
          <form>
            {/* ============= FULL NAME ============= */}
            <div className="Register-Display">
              <div className="Register-Items">
                <label htmlFor="ElderlyFirstN" className="Register-Input-Label">
                  {" "}
                  First Name{" "}
                </label>

                <input
                  type="text"
                  id="ElderlyFirstN"
                  className="Register-Input-Box"
                  required
                />
              </div>

              <div className="Register-Items">
                <label htmlFor="ElderlyLastN" className="Register-Input-Label">
                  {" "}
                  Last Name{" "}
                </label>

                <input
                  type="text"
                  id="ElderlyLastN"
                  className="Register-Input-Box"
                  required
                />
              </div>
            </div>

            {/* ============= PASSWORD ============= */}
            <div className="Register-Display">
              <div className="Register-Items">
                <label htmlFor="ElderlyPass" className="Register-Input-Label">
                  Password
                </label>
                <div className="Register-Input-Wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="ElderlyPass"
                    className="Register-Input-Box"
                    required
                  />
                  <span
                    className="Password-Toggle-Icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              <div className="Register-Items">
                <label
                  htmlFor="ElderlyPassConfirm"
                  className="Register-Input-Label"
                >
                  Password Confirmation
                </label>
                <div className="Register-Input-Wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="ElderlyPassConfirm"
                    className="Register-Input-Box"
                    required
                  />
                  <span
                    className="Password-Toggle-Icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
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
                required
              />
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
                  required
                />
              </div>

              <div className="Register-Items">
                <label htmlFor="ElderlyGender" className="Register-Input-Label">
                  {" "}
                  Gender{" "}
                </label>
                <select
                  id="ElderlyGender"
                  className="Register-Input-Box"
                  defaultValue=""
                  required
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
                <label
                  htmlFor="ElderlyContact"
                  className="Register-Input-Label"
                >
                  {" "}
                  Phone Number{" "}
                </label>

                <input
                  type="tel"
                  id="ElderlyContact"
                  className="Register-Input-Box"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
            </div>
          </form>

          <p className="Register-Notice">
            By creating an account, you agree to our terms and conditions and
            privacy policy
          </p>

          <div className="Register-Button-Container">
            <button
              type="submit"
              className="Register-Button"
              onClick={handleRegister}
            >
              Create an account
            </button>

            <p>
              Already have an account?{" "}
              <Link to="/login" className="Register-Already-have-Acc">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
