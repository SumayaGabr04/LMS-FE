// apiUsers.js

import axios from 'axios';
import AccessTokenProvider from '../components/AccessTokenProvider';

const BASE_URL = 'http://localhost:8090'; 

const apiUsers = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/all`);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  getLoggedInUser: async () => {
    try {
      // Get the user ID from the access token
      const userId = AccessTokenProvider.getUserId();

      // If userId is null, return null (user not logged in)
      if (!userId) {
        return null;
      }

      // Fetch the logged-in user details
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data; // Assuming your backend returns user details
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
      throw error;
    }
  },

};

export default apiUsers;