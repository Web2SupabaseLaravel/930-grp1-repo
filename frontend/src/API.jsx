import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Assuming token is stored in localStorage
  }
});

export const fetchCourses = () => api.get('courses');
export const fetchCourse = (id) => api.get(`courses/${id}`);
export const createCourse = (data) => api.post('courses', data);
export const updateCourse = (id, data) => api.put(`courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`courses/${id}`);

export default api;