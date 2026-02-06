import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url || 'unknown-url';
    const status = error?.response?.status || 'unknown-status';
    const message = error?.message || 'unknown-error';
    console.error(`[api] ${url} ${status} ${message}`);
    return Promise.reject(error);
  }
);

export default apiClient;
