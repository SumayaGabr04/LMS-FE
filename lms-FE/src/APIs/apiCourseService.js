import axios from 'axios';
import ErrorHandlingService from '../components/errorHandling/ErrorHandlingService';
import createAuthorizedInstance from './createAuthorizedInstance';

const BASE_URL = 'http://localhost:8080';

// // Function to fetch courses
// export const fetchCourses = async () => {
//   try {
//     const response = await createAuthorizedInstance().get('/courses');
//     if (response.status === 200) {
//       return response.data.courses;
//     }
//     throw new Error('Failed to fetch courses');
//   } catch (error) {
//     throw new Error(ErrorHandlingService.handleError(error));
//   }
// };


// Function to fetch courses with optional search term
export const fetchCourses = async (searchTerm = '') => {
  try {
    const url = searchTerm
      ? `/courses/search?searchTerm=${encodeURIComponent(searchTerm)}`
      : '/courses';

    const response = await createAuthorizedInstance().get(url);

    if (response.status === 200) {
      return response.data.courses;
    }

    throw new Error('Failed to fetch courses');
  } catch (error) {
    throw new Error(ErrorHandlingService.handleError(error));
  }
};

// Function to fetch course details by ID
export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await createAuthorizedInstance().get(`/courses/${courseId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch course details');
  } catch (error) {
    throw new Error(ErrorHandlingService.handleError(error));
  }
};

// Function to create a course
export const createCourse = async (courseData) => {
  try {
    const response = await createAuthorizedInstance().post('/courses', courseData);
    if (response.status === 201) {
      return { status: 'success' };
    }
    // Handle server response errors
    return ErrorHandlingService.handleError(new Error('Failed to create the course'));
  } catch (error) {
    // Handle network or unexpected errors
    return ErrorHandlingService.handleError(error);
  }
};

// Function to update a course
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await createAuthorizedInstance().put(`/courses/${courseId}`, courseData);
    if (response.status === 204) {
      return { status: 'success' };
    }
    throw new Error('Failed to update the course');
  } catch (error) {
    throw new Error(ErrorHandlingService.handleError(error));
  }
};

// Function to delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await createAuthorizedInstance().delete(`/courses/${courseId}`);
    if (response.status === 204) {
      return { status: 'success' };
    } else {
      throw new Error(`Failed to delete the course. Status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(ErrorHandlingService.handleError(error));
  }
};
