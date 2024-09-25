import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { UserContext } from "../../../UserContext.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import "./ChatBotPage.css";

const ChatBotPage = () => {
  const { user } = useContext(UserContext);
  const API_BASE_URL = "http://localhost:8080/api";
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [Newmessage, setNewMessage] = useState("");
  const [chatResponses, setChatResponses] = useState("");
  const [loading, setLoading] = useState(false);

  const ElderlyLinks = [
    {
      to: "/chatbot",
      title: "AI-Chatbot",
      icon: "https://cdn-icons-png.flaticon.com/128/2068/2068998.png",
    },
    {
      to: "/chats",
      title: "Chats",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
    },
    {
      to: "/reminder",
      title: "Reminders",
      icon: "https://cdn-icons-png.flaticon.com/128/5463/5463386.png",
    },
    {
      to: "/healthRecord",
      title: "Health Records",
      icon: "https://cdn-icons-png.flaticon.com/128/4039/4039062.png",
    },
    {
      to: "/settings",
      title: "Setting",
      icon: "https://cdn-icons-png.flaticon.com/128/2040/2040504.png",
    },
  ];

  const handleNewPrompt = async () => {
    setLoading(true);
    setMessage(Newmessage);
    setNewMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/Ollama/generate?promptMessage=${encodeURIComponent(
          Newmessage
        )}`
      );
      const data = await response.text(); // Assuming the response is text

      // Update the chatResponses state with the AI-generated response
      setChatResponses(data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderChatResponse = () => {
    if (!chatResponses) return null;

    // Split response into lines by new lines (\n)
    const lines = chatResponses.split("\n");

    // Helper function to render formatted text
    const formatText = (text) => {
      // Replace double asterisks with bold elements
      const parts = text.split(/\*\*/g); // Split on double asterisks
      return parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index}>{part}</strong> // Bold if it's in between asterisks
        ) : (
          part
        )
      );
    };

    // Helper function to render list items
    const renderList = (lines, level = 0) => {
      let listItems = [];
      let currentList = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check if the line starts with double asterisks for a new heading section
        if (line.startsWith("**")) {
          listItems.push(
            <h3 key={i} className="font-bold mt-4">
              {line.replace(/\*\*/g, "").trim()}
            </h3>
          );
        }
        // Check if the line starts with a number and period for a numbered list item
        else if (/^\d+\./.test(line)) {
          currentList.push(
            <li key={i} className="ml-4 list-decimal">
              {formatText(line.replace(/^\d+\.\s*/, ""))}{" "}
              {/* Remove the number and period */}
            </li>
          );
        }
        // Check if the line starts with an asterisk for a bulleted list item
        else if (line.startsWith("*")) {
          // Push the previous list if it exists
          if (currentList.length > 0) {
            listItems.push(
              <ul key={`list-${i}`} className="list-disc list-inside ml-4">
                {currentList}
              </ul>
            );
            currentList = [];
          }
          currentList.push(
            <li key={i} className="ml-4 list-disc">
              {formatText(line.substring(1).trim())}{" "}
              {/* Remove the * and trim */}
            </li>
          );
        }
        // Check if the line starts with a plus for a nested list item
        else if (line.startsWith("+")) {
          // Create a new nested list item
          if (currentList.length === 0) {
            listItems.push(
              <ul key={`list-${i}`} className="list-disc list-inside ml-4">
                {currentList}
              </ul>
            );
            currentList = [];
          }
          currentList.push(
            <li key={i} className="ml-8 list-disc">
              {formatText(line.substring(1).trim())}{" "}
              {/* Remove the + and trim */}
            </li>
          );
        }
        // Otherwise, treat the line as a paragraph
        else {
          // Push the previous list if it exists
          if (currentList.length > 0) {
            listItems.push(
              <ul key={`list-${i}`} className="list-disc list-inside ml-4">
                {currentList}
              </ul>
            );
            currentList = [];
          }
          listItems.push(
            <p key={i} className="mt-2">
              {formatText(line)}
            </p>
          );
        }
      }

      // Push any remaining list items
      if (currentList.length > 0) {
        listItems.push(
          <ul key={`list-end`} className="list-disc list-inside ml-4">
            {currentList}
          </ul>
        );
      }

      return listItems;
    };
    return <div>{renderList(lines)}</div>;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewPrompt();
    }
  };

  return (
    <>
      {user ? (
        <div className="chatbot-container">
          <aside className="flex">
            {user.role === "Elderly" && location.pathname === "/chatbot" && (
              <>
                <Sidebar mainLinks={ElderlyLinks} />
              </>
            )}
          </aside>

          <div className="cb-chatSection">
            {/* Main Content */}

            <main className="flex flex-col p-4 w-full max-w-full">
              <div className="p-5">
                <h1 className="text-xl font-medium">AI-Chatbot</h1>
              </div>
              <div
                id="response-container"
                className="flex-1 mb-4 p-4 h-full overflow-auto"
              >
                <div className="mb-8">
                  {message || chatResponses ? (
                    <>
                      <div className="inline-block bg-white text-base py-2 px-4 shadow rounded-xl">
                        {message}
                      </div>
                      <p className="mt-4 h-full overflow-auto">
                        {loading ? "Loading..." : renderChatResponse()}
                      </p>
                    </>
                  ) : (
                    <div className="grid h-96 place-content-center px-4 pt-40">
                      <h1 className="pt-32 uppercase tracking-widest text-gray-300 text-4xl font-semibold">
                        Ask Me Anything! AI Assistant
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Form */}
              <div>
                <div className="flex items-center bg-white rounded-full p-1 shadow-md ">
                  <input
                    id="message"
                    name="message"
                    className="bg-white outline-none text-gray-700 rounded-full py-2 px-4 w-full"
                    type="text"
                    placeholder="Message Chatbot"
                    value={Newmessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-gray-400 text-gray-600 rounded-full p-2 ml-2"
                    onClick={handleNewPrompt}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access AI-Chatbot"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default ChatBotPage;
