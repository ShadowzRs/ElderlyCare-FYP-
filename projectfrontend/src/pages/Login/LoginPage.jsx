import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Notification from "../../component/Notification/Notification.jsx";
import "./LoginPage.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:8080/elderly/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response status is 200 OK
      if (response.ok) {
        const validate = await response.text();

        if (validate !== "false") {
          navigate("/elderly-home");
        } else {
          showNotification("Login failed", "Invalid email or password");
        }
      } else {
        showNotification("Login failed", "Invalid email or password");
      }

      // Attempt healthcare provider login
      const role = await attemptHealthcareLogin(email, password);
      if (role) {
        if (role === "Doctor") {
          navigate("/doctor-home");
        } else if (role === "Caregiver") {
          navigate("/caregiver-home");
        } else {
          showNotification("An error occurred", "Please try again.");
        }
        return;
      }

      // If neither login attempt succeeded, show a notification
      showNotification("Login failed", "Invalid email or password");
    } catch (error) {
      console.error("Login error:", error);
      showNotification("An error occurred", "Please try again.");
    }
  };

  // Function to handle healthcare provider login and return the role
  const attemptHealthcareLogin = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:8080/healthcareprovider/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated === "true") {
          return data.role;
        }
      }
    } catch (error) {
      console.error("Error during healthcare provider login:", error);
      throw new Error("Healthcare provider login failed");
    }
    return null;
  };

  return (
    <section className="form-container">
      <div className="form-wrapper-left">
        <div className="form-text-container">
          <h1 className="form-text-header">Get started today!</h1>

          <p className="form-text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?{" "}
              <Link className="Already-have-Acc" to="/register">
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              className="form-input-button"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="form-wrapper-right">
        <h1>Welcome Back</h1>
      </div>
    </section>
  );
};

export default SignInForm;
