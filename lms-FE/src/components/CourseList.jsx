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
        <CourseItem
          key={course.id} 
          course={course}
          onDeleteClick={props.onDeleteClick}
          onUpdateClick={props.onUpdateClick}
          onMaterialUploadClick={props.onMaterialUploadClick}
          claims={props.claims} 
        />
      ))}
    </div>
  );
}

export default CourseList;
