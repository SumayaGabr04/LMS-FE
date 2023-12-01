import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react'; 
import LoginForm from '../components/LoginForm';

import AccessTokenProvider from '../components/AccessTokenProvider';
import apiAuth from '../APIs/apiAuth';

import '/src/App.css';



function Login() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState(AccessTokenProvider.getClaims());

 const handleLogin = (username, password) => {
  console.log("Attempting login with:", username, password);

  apiAuth.login(username, password)
  .then(claims => {
    console.log("Login successful. Claims:", claims);
    setClaims(claims);
    navigate('/');
  })
  .catch(error => {
    console.error("Login failed:", error);
    alert("Login failed!");
  });
}

  const handleLogout = () => {
    AccessTokenProvider.clear();
    setClaims(null);
  }

  useEffect(() => {
  }, [claims]);

  return (
    <>

      <div>
      <h1>My App</h1>
      {claims ? (
        <div>
          <p>Welcome, {claims.sub}</p>

          <button onClick={handleLogout}>Logout</button>
          <br />
          <a href='/' target='_blank'>Open in new Tab</a>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>

    </>
  );
}

export default Login;