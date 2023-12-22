import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails, updateCourse } from '../APIs/apiCourseService';

function UpdateCourse() {
  const { id } = useParams(); 
  const [courseData, setCourseData] = useState({
    id: '',
    courseName: '',
    description: '',
    instructor: '',
    enrollmentCapacity: 0,
    startDate: '',
    endDate: '',
    enrolledStudents: [],
    courseMaterials: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourse() {
      try {
        console.log("Course ID:", id); // Log id
        const courseDetails = await fetchCourseDetails(id);
        console.log("Course Details:", courseDetails); // Log courseDetails
        if (courseDetails) {
          setCourseData(courseDetails);
        } else {
          setError('Course details not found.');
        }
      } catch (error) {
        setError('Error fetching course details: ' + error.message);
        console.error('Error fetching course details:', error);
      }
    }
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCourse(id, courseData);
      if (response.status === 'success') {
        setSuccess(true);
        setError(null);
        navigate('/courses');
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError('Failed to update the course. Please check your data.');
      }
    } catch (error) {
      setError('An error occurred while updating the course: ' + error.message);
      console.error('Error updating the course:', error);
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Course updated successfully!</div>}
      <form onSubmit={handleSubmit} className="update-course-form">
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instructor:</label>
          <input
            type="text"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Enrollment Capacity:</label>
          <input
            type="number"
            name="enrollmentCapacity"
            value={courseData.enrollmentCapacity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={courseData.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={courseData.endDate}
            onChange={handleChange}
          />
        </div>
    {/* Display enrolled students */}
    {courseData.enrolledStudents && (
      <div>
        <h2>Enrolled Students:</h2>
        <ul>
          {courseData.enrolledStudents.map(student => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Display course materials */}
    {courseData.courseMaterials && (
      <div>
        <h2>Course Materials:</h2>
        <ul>
          {courseData.courseMaterials.map(material => (
            <li key={material.id}>{material.material}</li>
          ))}
        </ul>
      </div>
    )}

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default UpdateCourse;
