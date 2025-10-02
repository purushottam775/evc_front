import axios from 'axios';

// Backend URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000, // 15s timeout
  withCredentials: false, 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.groupCollapsed(`API Request → ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Data:', config.data);
      console.groupEnd();
    }

    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.groupCollapsed(`API Response ← ${response.status} ${response.config.url}`);
      console.log('Data:', response.data);
      console.groupEnd();
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data?.message);
    } else if (error.message === 'Network Error' || !error.response) {
      console.error('Network error - backend might be unavailable or CORS blocked');
      console.error('Backend URL:', API_URL);
    } else if (error.code === 'ERR_FAILED') {
      console.error('Request failed - likely CORS issue. Check backend CORS config.');
    }

    if (import.meta.env.DEV) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: error.config?.url,
        method: error.config?.method,
      });
    }

    return Promise.reject(error);
  }
);

export { API_URL };
export const getApiUrl = () => API_URL;
export default api;
