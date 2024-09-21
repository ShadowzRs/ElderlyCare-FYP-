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

// Function to check the search chats
export const checkIfChatExists = async (participantOneId, participantTwoId) => {
  try {
    const response = await axios.get(`${API_CHAT_BASE_URL}/check`, {
      params: {
        participantOneId,
        participantTwoId,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Chat not found
      return null; // Return null if the chat is not found
    } else {
      console.error("Error checking if chat exists:", error);
      throw error;
    }
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
    return response.data;
  } catch (error) {
    console.error("Error fetching chats for user:", error);
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
