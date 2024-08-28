import React from 'react';
import { Link } from 'react-router-dom';
import './FormStyles.css';

const SignInForm = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-header">Get started today</h1>

        <p className="form-subheader">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form action="#" className="form">
          <p className="form-title">Sign in to your account</p>

          <div className="input-group">
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <input
              type="email"
              className="input-group-input"
              placeholder="Enter email"
            />
            <span className="input-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              type="password"
              className="input-group-input"
              placeholder="Enter password"
            />
            <span className="input-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

          <button type="submit" className="submit-btn">
            Sign in
          </button>

          <p className="sign-up-link">
            No account?{" "}
            <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
