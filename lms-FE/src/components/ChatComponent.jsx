import { useEffect, useState } from 'react';

const ChatComponent = ({ loggedInUser, recipients }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [socket, setSocket] = useState(null);

  const handleSendMessage = async () => {
    if (content.trim() !== '' && selectedRecipient && socket && socket.readyState === WebSocket.OPEN) {
      try {
        const message = { content, sender: loggedInUser, recipient: selectedRecipient };
        socket.send(JSON.stringify({ type: 'CHAT', message }));
        setContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleRecipientChange = (event) => {
    setSelectedRecipient(event.target.value);
  };

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(`ws://localhost:8080/ws`);

      newSocket.onopen = () => {
        console.log('WebSocket opened successfully.');
        // You can send additional setup messages here if needed
      };

      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      newSocket.onclose = (event) => {
        console.error('WebSocket closed unexpectedly:', event);
        // You can handle the closure and attempt to reconnect if needed
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [socket]);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender.username}: </strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <select value={selectedRecipient} onChange={handleRecipientChange}>
          {recipients.map((recipient) => (
            <option key={recipient.id} value={recipient.id}>
              {recipient.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
