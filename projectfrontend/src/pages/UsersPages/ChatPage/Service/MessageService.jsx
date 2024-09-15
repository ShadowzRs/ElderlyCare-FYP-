import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const API_CHAT_BASE_URL = "http://localhost:8080/api/chats";

// Function to fetch userdata
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// STILL WORKING
export const checkIfChatExists = async (participantOneId, participantTwoId) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/check`, {
      params: {
        participantOneId,
        participantTwoId,
      },
    });
    return response.data.exists; // Assuming the response has an `exists` field
  } catch (error) {
    console.error("Error checking if chat exists:", error);
    throw error;
  }
};

// Function to create a chat
export const createChat = async (participantOneId, participantTwoId) => {
  try {
    const response = await axios.post(`${API_CHAT_BASE_URL}/create`, null, {
      params: {
        participantOneId,
        participantTwoId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Function to get all chats for a user
export const getAllChatsForUser = async (userId) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/user/${userId}`);
    console.log("Fetched chats:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats for user:", error);
    throw error;
  }
};

// Function to get chat by participants
export const getChatByParticipants = async (
  participantOneId,
  participantTwoId
) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/by-participants`, {
      params: {
        participantOneId,
        participantTwoId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat by participants:", error);
    throw error;
  }
};

// Function to send a message
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  try {
    await axios.post(`${API_CHAT_BASE_URL}/${chatId}/send`, null, {
      params: {
        senderId,
        receiverId,
        text,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Function to get messages by chat ID
export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages by chat ID:", error);
    throw error;
  }
};

// Function to get messages between two participants
export const getMessagesBetween = async (senderId, receiverId) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/messages`, {
      params: {
        senderId,
        receiverId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages between participants:", error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
        search: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for users:", error);
    throw error;
  }
};
