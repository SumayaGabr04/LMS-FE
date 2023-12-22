// TopCourses.jsx
import React, { useState, useEffect } from 'react';
import { fetchTop3Courses } from '../APIs/apiCourseService';
import 'bootstrap/dist/css/bootstrap.min.css';

function TopCourses() {
  const [topCourses, setTopCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCoursesData = async () => {
      try {
        const response = await fetchTop3Courses();
        console.log('Top 3 Courses Response:', response);

        if (Array.isArray(response)) {
          setTopCourses(response);
          setError(null);
        } else {
          throw new Error('Invalid data received from the server.');
        }
      } catch (error) {
        setTopCourses([]);
        setError('Failed to fetch top courses. ' + error.message);
        console.error('Error fetching top courses:', error);
      }
    };

    fetchTopCoursesData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Top 3 Courses with Most Enrolled Students</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      <ul className="list-group">
        {topCourses.map((course, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <strong>{course.courseName}</strong>: {course.totalStudents} enrolled students
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCourses;
