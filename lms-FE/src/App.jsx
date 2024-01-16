import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import CourseDetails from './pages/CourseDetails';
import CreateCourse from './pages/CreateCoursePage';
import UpdateCourse from './pages/UpdateCourse';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import MaterialUploadPage from './pages/MaterialUploadPage';
import Top3Courses from './pages/TopCourses';
import { connectToWebSocket } from './APIs/apiChat';


function App() {

  const [socket, setSocket] = useState(null);
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    // Your existing code to connect to WebSocket
    const newSocket = connectToWebSocket();
    setSocket(newSocket);
  
    return () => {
      if (newSocket) {
        newSocket.disconnect(); // Disconnect the WebSocket when the component unmounts
      }
    };
  }, []);
  
  

  return (
      <div className="App">
        <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/schedule" element={<Schedule />} /> */}
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/update-course/:id" element={<UpdateCourse />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/material-upload/:courseId" element={<MaterialUploadPage />} />
            <Route path="/top-courses" element={<Top3Courses />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
  );
}

export default App;
