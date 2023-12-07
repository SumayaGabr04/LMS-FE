import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccessTokenProvider from './AccessTokenProvider';

function CourseItem({ course, onUpdateClick, onDeleteClick, claims }) {
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

  const handleEnrollCourse = () => {
    const userId = AccessTokenProvider.getUserId();

    if (userId) {
      const confirmed = window.confirm('Are you sure you want to enroll in this course?');
      if (confirmed) {
        navigate(`/enroll-course/${userId}/${course.id}`);
      }
    } else {
      console.error('User ID is missing');
    }
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
    </div>
  );
}

export default CourseItem;
