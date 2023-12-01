import React, { useState, useEffect } from 'react';
import { enrollInCourse } from '../APIs/apiEnrollmentService';
import { useNavigate, useParams } from 'react-router-dom';
import AccessTokenProvider from '../components/AccessTokenProvider';

function EnrollCourse() {
  const { courseId } = useParams();
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleEnrollCourse = async () => {
    const userId = AccessTokenProvider.getUserId();

    if (userId) {
      try {
        const confirmed = window.confirm('Are you sure you want to enroll in this course?');
        if (confirmed) {
          const response = await enrollInCourse.enrollInCourse(userId, courseId);
          
          if (response.enrollmentId) {
            setEnrollmentStatus('success');
          } else {
            setErrorMessages(response.errorMessages || ['Failed to enroll. Please try again.']);
            setEnrollmentStatus('error');
          }
        }
      } catch (error) {
        setErrorMessages(['Failed to enroll. Please try again.']);
        setEnrollmentStatus('error');
      }
    } else {
      console.error('User ID is missing');
    }
  };

  useEffect(() => {
    // Display a message when enrollmentStatus changes
    if (enrollmentStatus === 'success') {
      alert('Enrollment successful!');
    } else if (enrollmentStatus === 'error') {
      alert('Failed to enroll. Please try again.');
      // Also display error messages if available
      if (errorMessages.length > 0) {
        alert('Error Messages:\n' + errorMessages.join('\n'));
      }
    }
  }, [enrollmentStatus, errorMessages]);

  return (
    <div>
      <h1>Enroll in Course</h1>
      <button className="enroll-button" onClick={handleEnrollCourse}>
        Enroll
      </button>
    </div>
  );
}

export default EnrollCourse;