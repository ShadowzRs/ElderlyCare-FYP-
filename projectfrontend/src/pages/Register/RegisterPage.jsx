import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import logo from "../../assets/AI-LifeConnect_Logo.png";
import RegisterImg from "../../assets/Online Doctor-rafiki-B.svg";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
    phone: "",
    age: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    // First Name Validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password is less than 6 characters";
    }

    // Password Confirmation Validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Email Validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Gender Validation
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    // Phone Number Validation
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      errors.phone = "Wrong format [0XX-XXX-XXXX]";
    }

    // Age Validation
    if (!formData.age) {
      errors.age = "Age is required";
    } else if (
      !/^\d+$/.test(formData.age) ||
      formData.age < 0 ||
      formData.age > 120
    ) {
      errors.age = "Please enter a valid age";
    }

    // Role Validation
    if (!formData.role) {
      errors.role = "Role is required";
    } else if (
      formData.role !== "Elderly" &&
      formData.role !== "HealthcareProvider"
    ) {
      errors.role = "Invalid role selected";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, proceed with the submission
      console.log("Form submitted successfully:", formData);
      // Additional submission logic here (e.g., API call)
    }
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
                <label htmlFor="firstName" className="Register-Input-Label">
                  First Name
                </label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="Register-Input-Box"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {formErrors.firstName && (
                  <div className="Error-Message">{formErrors.firstName}</div>
                )}
              </div>

              <div className="Register-Items">
                <label htmlFor="lastName" className="Register-Input-Label">
                  Last Name
                </label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="Register-Input-Box"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {formErrors.lastName && (
                  <div className="Error-Message">{formErrors.lastName}</div>
                )}
              </div>
            </div>

            {/* ============= PASSWORD ============= */}
            <div className="Register-Display">
              <div className="Register-Items">
                <label htmlFor="password" className="Register-Input-Label">
                  Password
                </label>
                <div className="Register-Input-Wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="Register-Input-Box-Pass"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="Password-Toggle-Icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {formErrors.password && (
                  <div className="Error-Message">{formErrors.password}</div>
                )}
              </div>

              <div className="Register-Items">
                <label
                  htmlFor="confirmPassword"
                  className="Register-Input-Label"
                >
                  Password Confirmation
                </label>
                <div className="Register-Input-Wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="Register-Input-Box-Pass"
                    placeholder="At least 6 characters"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="Password-Toggle-Icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {formErrors.confirmPassword && (
                  <div className="Error-Message">
                    {formErrors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* ============= EMAIL ============= */}
            <div>
              <label htmlFor="email" className="Register-Input-Label">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="Register-Input-Box"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <div className="Error-Message">{formErrors.email}</div>
              )}
            </div>

            {/* ============= GENDER & CONTACT ============= */}
            <div className="Register-Display">
              <div className="Register-Items">
                <label htmlFor="gender" className="Register-Input-Label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="Register-Input-Box"
                  value={formData.gender}
                  onChange={handleChange}
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
                {formErrors.gender && (
                  <div className="Error-Message">{formErrors.gender}</div>
                )}
              </div>

              <div className="Register-Items">
                <label htmlFor="phone" className="Register-Input-Label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="Register-Input-Box"
                  placeholder="0XX-XXX-XXXX"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && (
                  <div className="Error-Message">{formErrors.phone}</div>
                )}
              </div>
            </div>

            {/* ============= AGE & ROLE SELECTION ============= */}
            <div className="Register-Display">
              <div className="Register-Items-Age">
                <label htmlFor="age" className="Register-Input-Label">
                  Age
                </label>

                <input
                  type="text"
                  id="age"
                  name="age"
                  maxLength="3"
                  className="Register-Input-Box"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                {formErrors.age && (
                  <div className="Error-Message">{formErrors.age}</div>
                )}
              </div>

              <div className="Register-Items">
                <label className="Register-Input-Label">
                  Select your role:
                </label>
                <div className="RoleContainer">
                  <div className="RoleOption">
                    <input
                      type="radio"
                      id="elderly"
                      name="role"
                      value="Elderly"
                      checked={formData.role === "Elderly"}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="elderly" className="RoleInputLabel">
                      Elderly
                    </label>
                  </div>

                  <div className="RoleOption">
                    <input
                      type="radio"
                      id="healthcareProvider"
                      name="role"
                      value="HealthcareProvider"
                      checked={formData.role === "HealthcareProvider"}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="healthcareProvider"
                      className="RoleInputLabel"
                    >
                      Healthcare Provider
                    </label>
                  </div>
                </div>
                {formErrors.role && (
                  <div className="Error-Message">{formErrors.role}</div>
                )}
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
