import React, { useState, useEffect } from "react";
import { getAllChatsForUser, getUserById } from "./MessageService.jsx";
import "../ChatPage.css";

const ChatList = ({ userId, onChatSelect, onChatsLoaded }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Fetch the user's chats
    const fetchChats = async () => {
      try {
        const fetchedChats = await getAllChatsForUser(userId);
        setChats(fetchedChats);

        // Fetch user data for each participant
        const participantIds = new Set();
        fetchedChats.forEach((chat) => {
          participantIds.add(chat.participantOneId);
          participantIds.add(chat.participantTwoId);
        });

        const userPromises = Array.from(participantIds).map((id) =>
          getUserById(id)
        );
        const userResponses = await Promise.all(userPromises);

        // Create a map of user IDs to user details
        const userMap = userResponses.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        setUsers(userMap);
        onChatsLoaded(fetchedChats);
      } catch (error) {
        console.error("Error fetching chats or user data:", error);
      }
    };

    fetchChats();
  }, [userId]);

  return (
    <div>
      {chats.map((chat) => {
        // Determine the user data based on the role of the logged-in user
        const isParticipantOne = chat.participantOneId === userId;
        const participantId = isParticipantOne
          ? chat.participantTwoId
          : chat.participantOneId;
        const participant = users[participantId];
        const participantRole = participant?.role ?? "Elderly";

        return (
          <button
            key={chat.id}
            className="cp-user-profile"
            onClick={() => onChatSelect(chat.id)} // Add chat selection here
          >
            <img
              className="object-cover w-8 h-8 rounded-full"
              src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
              alt=""
            />
            <div className="cp-user-label-container">
              <h1 className="cp-user-name">
                {participant ? participant.firstname : "Loading..."}
              </h1>
              <p className="cp-user-desc">
                Role: {participant ? participantRole : "Loading..."}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
