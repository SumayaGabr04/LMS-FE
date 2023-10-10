import React from "react";

function CourseItem({ course }) {
  return (
    <div className="course">
      <h2>{course.title}</h2>
      <button className="view-button">View Course</button>
    </div>
  );
}

export default CourseItem;
