import React, { useState, useEffect, useRef } from "react";
import { getMessages } from "./MessageService";

const ChatConversation = ({ chatId, userId, chats }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const wsClientRef = useRef(null);
  const bottomRef = useRef(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(chatId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Initialize WebSocket client and handle messages
  useEffect(() => {
    wsClientRef.current = new WebSocket(
      `ws://localhost:8080/ws/chat/${chatId}`
    );

    wsClientRef.current.onopen = () => {
      console.log("WebSocket connection opened for chatId:", chatId);
    };

    wsClientRef.current.onclose = () => {
      console.log("WebSocket connection closed for chatId:", chatId);
    };

    wsClientRef.current.onerror = (error) => {
      console.error("WebSocket error for chatId:", chatId, error);
    };

    wsClientRef.current.onmessage = (event) => {
      console.log("Received WebSocket message:", event.data);
      refetchMessages();
    };

    // Cleanup WebSocket connection when chatId changes
    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.close();
        wsClientRef.current = null;
        console.log("WebSocket disconnected");
      }
    };
  }, [chatId]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && wsClientRef.current) {
      const message = {
        chatId,
        senderId: userId,
        receiverId: getReceiverIdFromChat(chatId),
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      if (message.receiverId) {
        if (wsClientRef.current.readyState === WebSocket.OPEN) {
          wsClientRef.current.send(JSON.stringify(message));
          setNewMessage("");
        } else {
          console.error("WebSocket is not open. Cannot send message.");
        }
      } else {
        console.error("Receiver ID is not set. Cannot send the message.");
      }
    } else {
      console.error("Cannot send an empty message or WebSocket is not open.");
    }
  };

  const refetchMessages = async () => {
    try {
      const newMessages = await getMessages(chatId);
      setMessages(newMessages);
      console.log("Messages updated: ", newMessages);
    } catch (error) {
      console.error("Failed to refetch messages:", error);
    }
  };

  const getReceiverIdFromChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return null;

    return chat.participantOneId === userId
      ? chat.participantTwoId
      : chat.participantOneId;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {messages.map((message, index) => {
              const isSender = message.senderId === userId;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    isSender
                      ? "col-start-6 col-end-13"
                      : "col-start-1 col-end-8"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isSender ? "justify-start flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    />

                    <div
                      className={`relative ${
                        isSender ? "mr-3 bg-indigo-100" : "ml-3 bg-white"
                      } text-sm py-2 px-4 shadow rounded-xl`}
                    >
                      <div>{message.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full pr-4">
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message"
              className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
          </div>
        </div>

        <div className="ml-4">
          <button
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatConversation;
