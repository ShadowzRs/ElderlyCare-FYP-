import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../component/MenuSideBar/Sidebar.jsx";
import { UserContext } from "../../../UserContext.jsx";
import ChatList from "./Service/ChatList.jsx";
import ChatConversation from "./Service/ChatMessage.jsx";
import ChatSearchBar from "./Service/ChatSearch.jsx";
import ErrorPage from "../../../component/Error/ErrorPage.jsx";
import "./ChatPage.css";

const ChatPage = () => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const location = useLocation();

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    setActiveChatId(chatId);
  };

  const handleChatCreated = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
    console.log(chats);
  };

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

  const DoctorLinks = [
    {
      to: "/chats",
      title: "Chats",
      icon: "https://cdn-icons-png.flaticon.com/128/589/589708.png",
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

  const CaregiverLinks = [
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

  return (
    <>
      {user ? (
        <div className="cp-section">
          <aside className="flex">
            {user.role === "Elderly" && location.pathname === "/chats" && (
              <Sidebar mainLinks={ElderlyLinks} />
            )}
            {user.role === "Doctor" && location.pathname === "/chats" && (
              <Sidebar mainLinks={DoctorLinks} />
            )}
            {user.role === "Caregiver" && location.pathname === "/chats" && (
              <Sidebar mainLinks={CaregiverLinks} />
            )}

            <div className="cp-container">
              <ChatSearchBar
                currentUserId={user.id}
                onSeach={(fetchedChatId) => handleChatSelect(fetchedChatId)}
                onChatCreated={(fetchednNewChat) =>
                  handleChatCreated(fetchednNewChat)
                }
              />
              <h2 className="cp-container-header">Accounts</h2>

              <div className="cp-user-list-container">
                <ChatList
                  userId={user.id}
                  onChatSelect={handleChatSelect}
                  onChatsLoaded={(fetchedChats) => setChats(fetchedChats)}
                  onActiveChatId={activeChatId}
                  chats={chats}
                />
              </div>
            </div>
          </aside>

          {/* Chat Section */}
          <div className="cs-Section">
            <div className="cs-Container">
              {selectedChatId ? (
                <ChatConversation
                  chatId={selectedChatId}
                  userId={user.id}
                  chats={chats}
                />
              ) : (
                <div className="grid h-screen place-content-center px-4">
                  <h1 className="uppercase tracking-widest text-gray-300 text-4xl font-semibold">
                    Select a chat to start messaging
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage
          errorCode="401"
          title="Unauthorized Access!"
          message="Invalid Authentication Credentials to Access Chats"
          buttonText="Return to Home"
          redirectTo="/"
        />
      )}
    </>
  );
};

export default ChatPage;
