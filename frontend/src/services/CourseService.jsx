import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/courses'; 

const getAllCourses = () => {
    return axios.get(API_URL);
};

const getCourseById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createCourse = (courseData) => {
    return axios.post(API_URL, courseData);
};

const updateCourse = (id, courseData) => {
    return axios.put(`${API_URL}/${id}`, courseData);
};

const deleteCourse = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const CourseService = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};

export default CourseService;

