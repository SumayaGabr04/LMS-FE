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

  apiAuth.login(username, password)
  .then(claims => {
    setClaims(claims);
    window.location.reload();
    navigate('/');
  })
  .catch(error => {
    alert("Login failed!");
  });
}

  const handleLogout = () => {
    AccessTokenProvider.clear();
    setClaims(null);
    window.location.reload();
  }

  useEffect(() => {
  }, [claims]);

  return (
    <>

      <div>
      <h1>My App</h1>
      {claims ? (
   <div className="welcome-container">
   <p className="welcome-message">Welcome, {claims.sub}</p>
   <button className="logout-button" onClick={handleLogout}>Logout</button>
   <br />
   <a className="open-in-new-tab" href='/' target='_blank'>Open in a new Tab</a>
 </div>
 
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>

    </>
  );
}

export default Login;