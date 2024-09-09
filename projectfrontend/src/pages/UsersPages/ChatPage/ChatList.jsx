import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext.jsx";
import { getAllChatsForUser, getUserById } from "./MessageService.jsx";
import "./ChatPage.css";

const defaultProfilePic = "";

const maleProfilePic = "";
const femaleProfilePic = "";

const ChatList = ({ userId }) => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});

  const getProfilePicUrl = (role, gender) => {
    // Default profile picture
    let profilePic = "https://cdn-icons-png.flaticon.com/128/666/666201.png";

    if (role !== "Elderly" && gender === "Male") {
      profilePic = "https://cdn-icons-png.flaticon.com/128/4140/4140037.png";
    } else if (role !== "Elderly" && gender === "Female") {
      profilePic = "https://cdn-icons-png.flaticon.com/128/4140/4140047.png";
    }
    return profilePic;
  };

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
        const isParticipantOne = chat.participantOneId === user.id;
        const participantId = isParticipantOne
          ? chat.participantTwoId
          : chat.participantOneId;
        const participant = users[participantId];

        return (
          <button key={chat.id} className="cp-user-profile">
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={
                participant
                  ? getProfilePicUrl(participant.role, participant.gender)
                  : null
              }
              alt=""
            />
            <div className="cp-user-label-container">
              <h1 className="cp-user-name">
                {participant ? participant.firstname : "Loading..."}
              </h1>
              <p className="cp-user-desc">
                Role: {participant ? participant.role : "Loading..."}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;
