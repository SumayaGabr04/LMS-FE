import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import apiUsers from '../APIs/apiUsers';

var stompClient = null;

const ChatComponent = ({ loggedInUser, recipients }) => {
  const [publicChats, setPublicChats] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    connected: false,
    message: '',
    fullName: '', // Declare fullName in the component state
  });

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUserResponse = await apiUsers.getLoggedInUser();

        if (loggedInUserResponse && loggedInUserResponse.user) {
          const { firstName, lastName } = loggedInUserResponse.user;
          const fullName = `${firstName} ${lastName}`;
          setUserData((prevUserData) => ({ ...prevUserData, username: fullName, fullName }));
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log('Connected to WebSocket');
    setUserData((prevUserData) => ({ ...prevUserData, connected: true }));
    stompClient.subscribe(`/chatroom/public`, onMessageReceived);
    stompClient.subscribe(`/chatroom/members`, onMembersListReceived);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.fullName, // Use userData.fullName instead of fullName
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (payloadData.members) {
          setMembersList(payloadData.members);
        }
        break;
      case "MESSAGE":
        setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
        break;
      default:
        console.error("Unknown status:", payloadData.status);
    }
  }  

  const onMembersListReceived = (payload) => {
    var membersData = JSON.parse(payload.body);
    setMembersList(membersData.members);
  }

  const onError = (err) => {
    console.log(err);
  }

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient && userData.username && userData.message) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log("Sending public message:", chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    console.log("Username:", value);
    setUserData({ ...userData, username: value });
  }

  const registerUser = () => {
    connect();
  }

  return (
    <div className="container-chat">
      {userData.connected ? (
        <div className="chat-box">
          {/* <div className="member-list">
            <h2>Members</h2>
            <ul>
              {membersList.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div> */}
          <div className="chat-content">
            <ul className="chat-messages">
              {publicChats.map((chat, index) => (
                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                  <div className="message-data">
                    <div className="sender-name">{chat.senderName}</div>
                  </div>
                  <div className="message-text">{chat.message}</div>
                </li>
              ))}
            </ul>
            <div className="send-message">
              <input type="text" className="input-message" placeholder="Enter the message" value={userData.message} onChange={handleMessage} />
              <button type="button" className="send-button" onClick={sendValue}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <button type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;