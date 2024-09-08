import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./UserContext"; // Import the UserProvider
import WebRouting from "./Routing.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <WebRouting />
    </UserProvider>
  </React.StrictMode>
);
