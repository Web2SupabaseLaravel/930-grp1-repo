import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    
      console.warn('Unauthorized, redirecting to login...');
      localStorage.removeItem('token');
     
    }

    return Promise.reject(error);
  }
);

export default instance;
