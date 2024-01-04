import React, { useState, useEffect } from 'react';
import { getEnrollmentsForStudent } from '../APIs/apiEnrollmentService'; 
import { dropOutFromCourse } from '../APIs/apiEnrollmentService';
import { AccessTokenProvider } from '../components/AccessTokenProvider';

function ProfilePage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const studentId = AccessTokenProvider.getUserId();
        const enrollmentsData = await getEnrollmentsForStudent(studentId);
        setEnrollments(enrollmentsData.enrollments);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

// Function to handle dropping out from a course with confirmation
const handleDropOut = async (enrollmentId) => {
  // Display a confirmation dialog
  const confirmDropOut = window.confirm('Are you sure you want to drop out from this course?');

  // If the user clicks "OK" in the confirmation dialog
  if (confirmDropOut) {
    try {
      // Call the API to drop out
      await dropOutFromCourse(enrollmentId);

      // Update the state to remove the dropped-out enrollment
      setEnrollments((prevEnrollments) =>
        prevEnrollments.filter((enrollment) => enrollment.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error('Error dropping out from course:', error);
    }
  }
};



  return (
    <div className="App profile-container">
      <div className="lms-header profile-header">
        <h1>My Profile</h1>
      </div>
      <div className="lms-content profile-content">
        <h2>Enrollments</h2>
        <ul className="profile-enrollments">
          {Array.isArray(enrollments) ? (
            enrollments.map((enrollment) => (
              <li key={enrollment.enrollmentId} className="profile-enrollment-item">
                Course: {enrollment.course.courseName}, Enrollment Date: {enrollment.enrollmentDate}
                <button onClick={() => handleDropOut(enrollment.enrollmentId)}>Drop Out</button>
              </li>
            ))
          ) : (
            <li>No enrollments found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;