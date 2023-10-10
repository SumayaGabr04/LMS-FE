import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseList from "../components/CourseList";

function Courses() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:8080/courses'); 
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
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
        <CourseList courses={courseData} />
      </div>
    </div>
  );
}

export default Courses;
