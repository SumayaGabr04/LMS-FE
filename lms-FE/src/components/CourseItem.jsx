import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseItem({ course, onUpdateClick, onDeleteClick }) {
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
    const confirmed = window.confirm('Are you sure you want to enroll in this course?');
    if (confirmed) {
      // Replace this with your actual enrollment logic
      // Once the user confirms enrollment, you can redirect them to the enrollment page
      navigate(`/enroll-course`);
    }
  };

  return (
    <div className="course">
      <h2>{course.title}</h2>
      <button className="view-button" onClick={handleViewCourse}>
        View Course
      </button>
      <button className="update-button" onClick={handleUpdateCourse}>
        Update
      </button>
      <button className="delete-button" onClick={handleDeleteCourse}>
        Delete
      </button>
      <button className="enroll-button" onClick={handleEnrollCourse}>
        Enroll
      </button>
    </div>
  );
}

export default CourseItem;
