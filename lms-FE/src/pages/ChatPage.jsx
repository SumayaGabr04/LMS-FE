// ChatPage.jsx
import React, { useState, useEffect } from 'react';
import apiUsers from '../APIs/apiUsers';
import ChatComponent from '../components/ChatComponent';
import AccessTokenProvider from '../components/AccessTokenProvider';

const ChatPage = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        // Fetch the logged-in user using the new function
        const loggedInUserResponse = await apiUsers.getLoggedInUser();
        setLoggedInUser(loggedInUserResponse.data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const users = await apiUsers.getAllUsers();
        setRecipients(users.map(user => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}` 
        })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchLoggedInUser();
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      {/* Pass the entire loggedInUser object to the ChatComponent */}
      <ChatComponent loggedInUser={loggedInUser} recipients={recipients} />
    </div>
  );
};

export default ChatPage;
