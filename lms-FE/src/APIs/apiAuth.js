import axios from "axios";
import AccessTokenProvider from "../components/AccessTokenProvider";

// const apiAuth = {
//   login: (email, password) => axios.post('http://localhost:8080/tokens', { email, password })
//       .then(response => response.data.accessToken)
//       .then(accessToken => AccessTokenProvider.setAccessToken(accessToken))
// }

const apiAuth = {
  login: (email, password) => axios.post('http://localhost:8090/tokens', { email, password })
      .then(response => {
        const accessToken = response.data.accessToken;
        AccessTokenProvider.setAccessToken(accessToken);
        // console.log('Login Successful. Access Token:', accessToken);
        return accessToken;
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw error;
      })
}



export default apiAuth;