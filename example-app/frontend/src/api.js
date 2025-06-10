import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';
export const CORRECT_COURSE_ID = 'f2849c27-30f5-40b4-9cdd-87521090bdbb';
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false,
  timeout: 30000
});
export default api;



