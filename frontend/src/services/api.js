import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer mock-token-123`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
