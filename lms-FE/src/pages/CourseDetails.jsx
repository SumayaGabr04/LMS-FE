import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../APIs/apiCourseService';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await fetchCourseDetails(id);
        const transformedCourse = {
          id: courseData.id,
          courseName: courseData.courseName,
          description: courseData.description,
          instructor: courseData.instructor,
          enrollmentCapacity: courseData.enrollmentCapacity,
          startDate: courseData.startDate,
          endDate: courseData.endDate,
        };
        setCourse(transformedCourse);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchData();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail">
      <h1>{course.courseName}</h1>
      <p>Description: {course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Enrollment Capacity: {course.enrollmentCapacity}</p>
      <p>Start Date: {course.startDate}</p>
      <p>End Date: {course.endDate}</p>
      {/* Display course materials here */}
    </div>
  );
}

export default CourseDetails;
