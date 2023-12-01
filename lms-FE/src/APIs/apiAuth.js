import axios from "axios";
import AccessTokenProvider from "../components/AccessTokenProvider";

const apiAuth = {
  login: (email, password) => axios.post('http://localhost:8080/tokens', { email, password })
      .then(response => response.data.accessToken)
      .then(accessToken => AccessTokenProvider.setAccessToken(accessToken))
}

// export const logout = () => {
//   localStorage.removeItem('accessToken');
// };

export default apiAuth;