import React from "react";
import { useNavigate } from 'react-router-dom';

function CourseItem({ course }) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course">
      <h2>{course.title}</h2>
      <button className="view-button" onClick={handleViewCourse}>
        View Course
      </button>
    </div>
  );
}

export default CourseItem;
