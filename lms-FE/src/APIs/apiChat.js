import axios from 'axios';
import createAuthorizedInstance from './createAuthorizedInstance';

const BASE_URL = 'http://localhost:8080';

const apiChat = {
  sendMessage: async (message) => {
    try {
      const authorizedInstance = createAuthorizedInstance();
      console.log('Request Headers:', authorizedInstance.defaults.headers);
      console.log('Access Token:', AccessTokenProvider.getAccessToken());

      
      const response = await authorizedInstance.post('/app/chat', message);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default apiChat;
