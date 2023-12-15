import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../APIs/apiCourseService';
import MaterialApi from '../APIs/MaterialApi';


function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleDownload = async (materialId, materialName) => {
    try {
      setLoading(true);
      const materialData = await MaterialApi.downloadMaterial(materialId);

      // Create a blob from the response data
      const blob = new Blob([materialData]);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = materialName;

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);

      setLoading(false);
    } catch (error) {
      console.error('Error downloading material:', error);
      setError('Failed to download material');
      setLoading(false);
    }
  };

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

      {/* Display course materials with download links */}
      <div>
        <h2>Course Materials:</h2>
        <ul>
        {course.courseMaterials.map((material) => (
  <li key={material.id}>
    {material.title} {/* Display the title */}
    {' '}
    <button
      className="btn btn-primary btn-sm"
      onClick={() => handleDownload(material.id, material.title)} 
    >
      Download
    </button>
  </li>
))}

        </ul>
      </div>
    </div>
  );
}

export default CourseDetails;
