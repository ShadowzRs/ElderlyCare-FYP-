import React, { useState, useEffect, useRef } from "react";
import {
  checkIfChatExists,
  createChat,
  searchUsers,
} from "./MessageService.jsx";
import { useNavigate } from "react-router-dom";
import "../ChatPage.css";

const ChatSearchBar = ({ currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside the list
  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowList(false);
      setSearchQuery("");
      setFilteredUsers([]);
    }
  };

  // Add & Clear event listeners for clicks and key presses
  useEffect(() => {
    console.log("Adding event listeners");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      console.log("Removing event listeners");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch users based on the search query
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const users = await searchUsers(query);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // STILL WORKING
  // const handleUserSelect = async (selectedUserId) => {
  //   try {
  //     // Check if chat exists
  //     const chatExists = await checkIfChatExists(currentUserId, selectedUserId);

  //     if (chatExists) {
  //       // If chat exists, navigate to that chat
  //       navigate(`/chat/${selectedUserId}`); // Assuming `selectedUserId` is used as `chatId` in your chat URL
  //     } else {
  //       // If chat doesn't exist, create a new chat
  //       console.log("Not in the existing list");
  //       // const newChat = await createChat(currentUserId, selectedUserId);

  //       // Navigate to the new chat
  //       // navigate(`/chat/${newChat.id}`); // Assuming `newChat.id` is the ID of the newly created chat
  //     }
  //   } catch (error) {
  //     console.error("Error handling user selection:", error);
  //   }
  // };

  return (
    <div className="cp-search-container">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>

      <input
        type="text"
        id="Search"
        placeholder="Search"
        className="cp-search"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setShowList(true)}
        autoComplete="off"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <div className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </span>

      {/* Display filtered users */}
      {showList && (
        <ul className="search-results" ref={listRef}>
          {filteredUsers.length > 0
            ? filteredUsers
                .sort((a, b) => a.firstname.localeCompare(b.firstname))
                .map((user) => (
                  <li
                    key={user.id}
                    // onClick={() =>
                    //   user.id !== currentUserId && handleUserSelect(user.id)
                    // }
                    className={user.id === currentUserId ? "disabled" : ""}
                  >
                    {user.firstname} {user.lastname}
                  </li>
                ))
            : searchQuery && <li>User is Not Found</li>}
        </ul>
      )}
    </div>
  );
};

export default ChatSearchBar;
