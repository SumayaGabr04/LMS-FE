import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseList from "../components/CourseList";
import { fetchCourses } from '../APIs/apiCourseService';

function Courses() {
  const [courseData, setCourseData] = useState([]);

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
        <CourseList courses={courseData} />
      </div>
    </div>
  );
}

export default Courses;
