import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({
  errorCode = "401",
  title = "Uh-oh!",
  message = "Unauthorized Access",
  buttonText = "Go Back Home",
  redirectTo = "/",
}) => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">{errorCode}</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </p>
        <p className="mt-4 text-gray-500">{message}</p>

        <Link
          to={redirectTo}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
