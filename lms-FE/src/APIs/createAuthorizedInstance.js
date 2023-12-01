import axios from "axios";
import AccessTokenProvider from '../components/AccessTokenProvider';


const BASE_URL = 'http://localhost:8080';

const createAuthorizedInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${AccessTokenProvider.getAccessToken()}`,
    },
  });

  return instance;
};

export default createAuthorizedInstance;