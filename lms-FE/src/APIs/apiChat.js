import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import createAuthorizedInstance from './createAuthorizedInstance';

const BASE_URL = 'http://localhost:8080';
const websocketEndpoint = `${BASE_URL}/ws`;
const stompClient = Stomp.over(new SockJS(websocketEndpoint));

const connectToWebSocket = () => {
  const authorizedInstance = createAuthorizedInstance();
  const stompInstance = Stomp.over(new SockJS(websocketEndpoint));

  // Fix: Pass headers directly to the connect function
  stompInstance.connect(
    { Authorization: `Bearer ${authorizedInstance.defaults.headers.common.Authorization}` },
    () => {
      console.log('Connected to WebSocket');
      // Additional logic after connecting to WebSocket
    },
    (error) => {
      console.error('Error connecting to WebSocket:', error);
    }
  );

  // Add an error callback
  stompInstance.onWebSocketError = (event) => {
    console.error('WebSocket error:', event);
  };

  return stompInstance;
};




export { connectToWebSocket };
