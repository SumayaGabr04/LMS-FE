import React, { useState } from 'react';
import { createCourse } from '../APIs/apiCourseService';

function CreateCourse() {
  const [courseData, setCourseData] = useState({
    id: '', 
    courseName: '',
    description: '',
    instructor: '',
    enrollmentCapacity: 0,
    startDate: '',
    endDate: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCourse(courseData);
      if (response.status === 'success') {
        // Handle success
        setSuccess(true);
        setError(null);
        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        // Handle server response errors
        setSuccess(false);
        setError('Failed to create the course. Please check your data.');
      }
    } catch (error) {
      // Handle network or unexpected errors
      setSuccess(false);
      setError('An error occurred while creating the course: ' + error.message);
      console.error('Error creating the course:', error);
    }
  };  

  return (
    <div>
      <h2>Create a New Course</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Course created successfully!</div>}
      <form onSubmit={handleSubmit} className="create-course-form">
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
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;
