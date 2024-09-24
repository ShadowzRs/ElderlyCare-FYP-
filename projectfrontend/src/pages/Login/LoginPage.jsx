import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./LoginPage.css";

const SignInForm = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
      // Attempt elderly login
      const elderlyResponse = await fetch(
        "http://localhost:8080/elderly/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (elderlyResponse.ok) {
        const elderlyData = await elderlyResponse.json();

        if (elderlyData.authenticated === "true") {
          // Store elderly user data
          const userData = { id: elderlyData.id, email, role: "Elderly" };
          console.log("User Data:", userData);
          loginUser(userData); // Save in context and local storage
          navigate("/chats");
          return;
        }
      }

      // Attempt healthcare provider login
      const providerResponse = await fetch(
        "http://localhost:8080/healthcareprovider/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (providerResponse.ok) {
        const HprovData = await providerResponse.json();

        if (HprovData.authenticated === "true") {
          const userData = { id: HprovData.id, email, role: HprovData.role };
          console.log("User Data:", userData);
          loginUser(userData); // Save user data in context and local storage
          navigate("/chats");
        } else {
          alert(
            "Login Failed!\nPlease check your email and password and try again."
          );
        }
      } else {
        alert(
          "Login Failed!\nPlease check your email and password and try again."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        "Login Failed!\nPlease check your email and password and try again."
      );
    }
  };

  return (
    <section className="form-container">
      <div className="mx-auto max-w-screen-xl pb-16">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started AI-LifeConnect
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Welcome back! Please log in to your AI-LifeConnect account to access
            personalized care and support tailored for you.
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

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
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {!isPasswordVisible ? (
                    <FaEyeSlash className="size-4 text-gray-400" />
                  ) : (
                    <FaEye className="size-4 text-gray-400" />
                  )}
                </span>
              </div>
            </div>

            <div className="form-input-container">
              <button
                type="submit"
                className="form-input-button"
                onClick={handleLogin}
              >
                Sign in
              </button>

              <p className="text-sm text-gray-500">
                No account?{" "}
                <Link className="Already-have-Acc" to="/register">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
