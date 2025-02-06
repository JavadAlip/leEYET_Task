import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Your base URL
});

// Add the token to the headers before each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');  // Or wherever you store the token
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
