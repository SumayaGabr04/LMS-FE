import React from 'react';
import CourseItem from './CourseItem';

function CourseList(props) {
  if (!Array.isArray(props.courses)) {
    console.log('No courses available:', props.courses);
    return <div>No courses available</div>;
  }

  console.log('Courses data:', props.courses);

  return (
    <div id="courses-list" className="courses-container">
      {props.courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}

export default CourseList;
