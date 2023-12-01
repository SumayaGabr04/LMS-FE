import React, { useState, useEffect } from 'react';
import { getEnrollmentsForStudent } from '../APIs/apiEnrollmentService'; 
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