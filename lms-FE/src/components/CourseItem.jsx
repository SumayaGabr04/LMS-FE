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
    </div>
  );
}

export default CourseItem;
