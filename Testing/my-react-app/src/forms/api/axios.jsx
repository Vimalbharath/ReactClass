import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006',
});

// 🛡️ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['X-Client-App'] = 'VimalProject';
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// 🔁 Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log('[Response]', response.status, response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn('[Interceptor] 401 Unauthorized');
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (status === 403) {
      alert('Access denied.');
    } else if (status >= 500) {
      alert('Server error. Please try again later.');
    } else {
      alert(error.response?.data?.message || 'Something went wrong');
    }

    return Promise.reject(error);
  }
);

export default api;