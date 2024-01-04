// apiEnrollmentService.js
import axios from 'axios';
import createAuthorizedInstance from './createAuthorizedInstance';

const BASE_URL = 'http://localhost:8080';

export const enrollInCourse = async (studentId, courseId) => {
  try {
    const response = await createAuthorizedInstance().post('/enrollments', {
      studentId,
      courseId,
    });

    return response.data;
  } catch (error) {
    // Handle specific error messages or return the entire error response
    if (error.response && error.response.data && error.response.data.errorMessages) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getEnrollmentsForStudent = async (studentId) => {
  try {
    const response = await createAuthorizedInstance().get(`/enrollments/student/${studentId}`);
    return response.data;
  } catch (error) {
    // Handle specific error messages or return the entire error response
    if (error.response && error.response.data && error.response.data.errorMessages) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const dropOutFromCourse = async (enrollmentId) => {
  try {
    const response = await createAuthorizedInstance().delete(`/enrollments/${enrollmentId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorMessages) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};
