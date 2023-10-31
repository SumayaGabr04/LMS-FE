import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import CourseList from '../components/CourseList';
import { fetchCourses, deleteCourse, updateCourse } from '../APIs/apiCourseService';

function Courses() {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate(); // Get the navigation function using useNavigate

  // Function to delete a course by ID
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await deleteCourse(courseId);
      if (response.status === 204) {
        // Course deleted successfully, update the course list
        const updatedCourses = courseData.filter((course) => course.id !== courseId);
        setCourseData(updatedCourses);
      } else {
        // Handle deletion failure
        console.error('Failed to delete the course.');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error deleting the course:', error);
    }
  }
  
  const handleUpdateCourse = (courseId) => {
    // Navigate to the update course page with the courseId in the URL
    navigate(`/update-course/${courseId}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const courses = await fetchCourses();
        const transformedData = courses.map((course) => ({
          id: course.id,
          title: course.courseName,
        }));
        setCourseData(transformedData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
       <div className="container">
         <div className="row">
           <div className="col">
             <div className="jumbotron">
               <h1 className="display-4">Learning Management System</h1>
             </div>
           </div>
         </div>
    </div>

    <div className="container">
      <CourseList
        courses={courseData}
        onUpdateClick={handleUpdateCourse}
        onDeleteClick={handleDeleteCourse}
      />
    </div>
  </div>
  );
}

export default Courses;


// // Courses.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CourseList from '../components/CourseList';
// import { fetchCourses, deleteCourse, updateCourse } from '../APIs/apiCourseService';

// function Courses() {
//   const [courseData, setCourseData] = useState([]);

// // Function to delete a course by ID
// const handleDeleteCourse = async (courseId) => {
//   try {
//     const response = await deleteCourse(courseId);
//     if (response.status === 204) {
//       // Course deleted successfully, update the course list
//       const updatedCourses = courseData.filter((course) => course.id !== courseId);
//       setCourseData(updatedCourses);
//     } else {
//       // Handle deletion failure
//       console.error('Failed to delete the course.');
//     }
//   } catch (error) {
//     // Handle network or unexpected errors
//     console.error('Error deleting the course:', error);
//   }
// }
  
//   const handleUpdateCourse = (courseId) => {
//     // Navigate to the update course page with the courseId in the URL
//     navigate(`/update-course/${courseId}`);
//   }

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const courses = await fetchCourses();
//         const transformedData = courses.map((course) => ({
//           id: course.id,
//           title: course.courseName,
//         }));
//         setCourseData(transformedData);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//        <div className="container">
//          <div className="row">
//            <div className="col">
//              <div className="jumbotron">
//                <h1 className="display-4">Learning Management System</h1>
//              </div>
//            </div>
//          </div>
//     </div>

//       <div className="container">
//         <CourseList
//           courses={courseData}
//           onUpdateClick={handleUpdateCourse}
//           onDeleteClick={handleDeleteCourse}
//         />
//       </div>
//     </div>
//   );
// }

// export default Courses;
