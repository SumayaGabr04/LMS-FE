import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccessTokenProvider from './AccessTokenProvider';
import { enrollInCourse } from '../APIs/apiEnrollmentService';

function CourseItem({ course, onUpdateClick, onDeleteClick, onMaterialUploadClick, claims }) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/courses/${course.id}`);
  };

  const handleUpdateCourse = () => {
    navigate(`/update-course/${course.id}`);
  };

  const handleDeleteCourse = () => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      onDeleteClick(course.id);
    }
  };

  const handleEnrollCourse = async () => {
    const userId = AccessTokenProvider.getUserId();

    if (userId) {
      try {
        const confirmed = window.confirm('Are you sure you want to enroll in this course?');
        if (confirmed) {
          // Call the enrollInCourse API function
          const response = await enrollInCourse(userId, course.id);

          if (response.enrollmentId) {
            alert('Enrollment successful!');
            navigate(`/profile`);
            // You can also perform additional actions if needed
          } else {
            alert('Failed to enroll. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error enrolling in the course:', error);
        alert('Failed to enroll. Please try again.');
      }
    } else {
      console.error('User ID is missing');
    }
  };


  const handleMaterialUpload = () => {
    onMaterialUploadClick(course.id);
  };

  const userRole = AccessTokenProvider.getUserRole();

  return (
    <div className="course">
      <h2>{course.title}</h2>
      <button className="view-button" onClick={handleViewCourse}>
        View Course
      </button>
      {userRole.includes('ADMIN') && (
        <>
          <button className="update-button" onClick={handleUpdateCourse}>
            Update
          </button>
          <button className="delete-button" onClick={handleDeleteCourse}>
            Delete
          </button>
        </>
      )}
      {userRole.includes('STUDENT') && (
        <button className="enroll-button" onClick={handleEnrollCourse}>
          Enroll
        </button>
      )}
         {userRole.includes('TEACHER') && (
          <button className="material-upload-button" onClick={handleMaterialUpload}>
          Upload Material
        </button>
      )}
    </div>
  );
}

export default CourseItem;
