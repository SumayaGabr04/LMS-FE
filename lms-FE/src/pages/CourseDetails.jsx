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
          enrolledStudents: courseData.enrolledStudents,
          courseMaterials: courseData.courseMaterials,
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
     {/* Display enrolled students */}
     <div>
        <h2>Enrolled Students:</h2>
        <ul>
          {course.enrolledStudents.map(student => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>

      {/* Display course materials */}
      <div>
        <h2>Course Materials:</h2>
        <ul>
          {course.courseMaterials.map(material => (
            <li key={material.id}>{material.material}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetails;
