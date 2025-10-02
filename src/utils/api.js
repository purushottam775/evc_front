import axios from 'axios';

// Use hosted backend URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'https://evc-backend-tciv.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 second timeout for hosted server
  withCredentials: false, // For CORS with hosted backend
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log API calls in development
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - user might be blocked
      console.error('Access forbidden:', error.response.data?.message);
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      // Network error - could be CORS or backend down
      console.error('Network error - this could be a CORS issue or backend server might be unavailable');
      console.error('Backend URL:', API_URL);
    } else if (error.code === 'ERR_FAILED') {
      // Browser blocked the request - likely CORS
      console.error('Request failed - likely CORS issue. Backend needs to allow your frontend domain.');
    }
    
    // Log error details in development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    
    return Promise.reject(error);
  }
);

// Export API URL for debugging
export { API_URL };
export default api;
