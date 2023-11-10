import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';  
import Login from './pages/Login';
import CourseDetails from './pages/CourseDetails';
import CreateCourse from './pages/CreateCoursePage';
import UpdateCourse from './pages/UpdateCourse';
import EnrollCourse from './pages/EnrollPage';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/enroll-course" element={<EnrollCourse />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
