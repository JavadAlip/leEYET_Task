import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://leeyet-backend.onrender.com/api', //base URL
    withCredentials: true
});

// Add the token to the headers before each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
