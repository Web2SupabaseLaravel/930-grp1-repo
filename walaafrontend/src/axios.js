// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // عدل حسب مشروعك
});

// ✅ أضف التوكن تلقائيًا من localStorage
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
