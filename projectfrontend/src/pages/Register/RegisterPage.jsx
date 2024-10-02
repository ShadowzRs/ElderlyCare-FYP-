import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import logo from "../../assets/AI-LifeConnect_Logo.png";
import RegisterImg from "../../assets/Online Doctor-rafiki-B.svg";
import Notification from "../../component/Notification/Notification.jsx";
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
    healthProviderSpecialty: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (message1, message2) => {
    setNotification({ message1, message2 });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = async () => {
    let errors = {};
    let isValid = true;

    // First Name Validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password is less than 6 characters";
      isValid = false;
    }

    // Password Confirmation Validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Email Validation
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    } else {
      // Check if email exists
      try {
        const response = await fetch(
          `http://localhost:8080/api/check-email?email=${formData.email}`
        );
        const data = await response.json();
        if (data.exists) {
          errors.email = "Email is already in use";
          isValid = false;
        }
      } catch (error) {
        console.error("Error checking email:", error);
        errors.email = "Error checking email";
        isValid = false;
      }
    }

    // Gender Validation
    if (!formData.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    // Phone Number Validation
    if (!formData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^0\d{2}-\d{3}-\d{4}$/.test(formData.phone)) {
      errors.phone = "Wrong format [0XX-XXX-XXXX]";
      isValid = false;
    }

    // Age Validation
    if (!formData.age) {
      errors.age = "Age is required";
      isValid = false;
    } else if (
      !/^\d+$/.test(formData.age) ||
      formData.age < 0 ||
      formData.age > 120
    ) {
      errors.age = "Please enter a valid age";
      isValid = false;
    }

    // Role Validation
    if (!formData.role) {
      errors.role = "Role is required";
      isValid = false;
    } else if (
      formData.role !== "Elderly" &&
      formData.role !== "HealthcareProvider"
    ) {
      errors.role = "Invalid role selected";
      isValid = false;
    }

    if (
      formData.role === "HealthcareProvider" &&
      !formData.healthProviderSpecialty
    ) {
      errors.healthProviderSpecialty = "Required for Healthcare Providers";
      isValid = false;
    }

    if (formData.role === "Elderly" && !formData.emergencyContactName.trim()) {
      errors.emergencyContactName = "Emergency Contact Name is required";
      isValid = false;
    }

    if (formData.role === "Elderly" && !formData.emergencyContactNumber) {
      errors.emergencyContactNumber = "Phone number is required";
      isValid = false;
    } else if (formData.role === "Elderly" && !/^0\d{2}-\d{3}-\d{4}$/.test(formData.emergencyContactNumber)) {
      errors.emergencyContactNumber = "Wrong format [0XX-XXX-XXXX]";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = await validate();
    if (!isValid) {
      return;
    }

    let roleEndpoint = "";
    let userData = {};

    if (formData.role === "Elderly") {
      if (formData.age < 50) {
        setFormErrors({
          age: "You must be 50 years or older to register as Elderly",
        });
        return; // Stop the submission
      }

      roleEndpoint = "http://localhost:8080/elderly/add";
      userData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        password: formData.confirmPassword,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        phonenumber: formData.phone,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactNumber: formData.emergencyContactNumber,
      };
    } else if (formData.role === "HealthcareProvider") {
      roleEndpoint = "http://localhost:8080/healthcareprovider/add";
      userData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        password: formData.confirmPassword,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        phonenumber: formData.phone,
        role: formData.healthProviderSpecialty,
      };
    } else {
      setFormErrors({ role: "Role is required" });
      return; // To Stop submission
    }
    console.log(formData);
    try {
      const response = await fetch(roleEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      if (response.ok) {
        // Show notification on success
        showNotification(
          "Successfully Register",
          "You have successfully registered your account."
        );
        // Navigate to a different page on success
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Navigate after 3 seconds
      } else {
        const errorData = await response.json();
        console.error("Error submitting the form:", errorData);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <section className="Register-Section">
      <div className="Register-Left-Container">
        <img src={RegisterImg} className="Register-Img" />
        <div className="R-Font">
          <h1>Join Us Today !</h1>
          <p>
            Experience Compassionate Care with AI-LifeConnect, Empowering You to
            Live Your Best Life in Your Golden Years!
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
                  pattern="^0\d{2}-\d{3}-\d{4}$"
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

              <div>
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

              {/* Conditional Rendering for Healthcare Provider */}
              {formData.role === "HealthcareProvider" && (
                <div>
                  <label className="Register-Input-Label">
                    Role Specialty:
                  </label>
                  <div className="RoleContainer">
                    <div className="RoleOption">
                      <input
                        type="radio"
                        id="caregiver"
                        name="healthProviderSpecialty"
                        value="Caregiver"
                        checked={
                          formData.healthProviderSpecialty === "Caregiver"
                        }
                        onChange={handleChange}
                      />
                      <label htmlFor="caregiver" className="RoleInputLabel">
                        Caregiver
                      </label>
                    </div>

                    <div className="RoleOption">
                      <input
                        type="radio"
                        id="doctor"
                        name="healthProviderSpecialty"
                        value="Doctor"
                        checked={formData.healthProviderSpecialty === "Doctor"}
                        onChange={handleChange}
                      />
                      <label htmlFor="doctor" className="RoleInputLabel">
                        Doctor
                      </label>
                    </div>
                  </div>
                  {formErrors.healthProviderSpecialty && (
                    <div className="Error-Message">
                      {formErrors.healthProviderSpecialty}
                    </div>
                  )}
                </div>
              )}
            </div>

            {formData.role === "Elderly" && (
              <div className="Register-Display">
                <div className="Register-Items">
                  <label
                    htmlFor="emergencyContactName"
                    className="Register-Input-Label"
                  >
                    Emergency Contact Name:
                  </label>

                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    className="Register-Input-Box"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                  />
                  {formErrors.emergencyContactName && (
                    <div className="Error-Message">
                      {formErrors.emergencyContactName}
                    </div>
                  )}
                </div>

                <div className="Register-Items">
                  <label
                    htmlFor="emergencyContactNumber"
                    className="Register-Input-Label"
                  >
                    Emergency Contact Number:
                  </label>

                  <input
                    type="tel"
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    placeholder="0XX-XXX-XXXX"
                    pattern="^0\d{2}-\d{3}-\d{4}$"
                    className="Register-Input-Box"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                  />
                  {formErrors.emergencyContactNumber && (
                    <div className="Error-Message">
                      {formErrors.emergencyContactNumber}
                    </div>
                  )}
                </div>
              </div>
            )}
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
              <Link to="/login" className="Already-have-Acc">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {notification && (
        <Notification
          message1={notification.message1}
          message2={notification.message2}
          onClose={closeNotification}
        />
      )}
    </section>
  );
};

export default RegisterPage;
