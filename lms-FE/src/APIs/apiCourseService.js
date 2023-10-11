import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Function to fetch courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    if (response.status === 200) {
      return response.data.courses; 
    }
    throw new Error('Failed to fetch courses');
  } catch (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
};

// Function to fetch course details by ID
export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
    if (response.status === 200) {
      return response.data; 
    }
    throw new Error('Failed to fetch course details');
  } catch (error) {
    throw new Error(`Error fetching course details: ${error.message}`);
  }
};