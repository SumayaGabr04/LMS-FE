import React from 'react';
import CourseItem from "./CourseItem";

function CourseList(props) {
    return (
        <div id="courses-list" className="courses-container">
          {props.courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      );
}

export default CourseList;
