
import axios from 'axios';

export const API_DOMAIN = 'https://renkei-backend.onrender.com';
// export const API_DOMAIN = 'http://localhost:8080';

let bearerToken = '';

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (bearerToken) {
      config.headers['Authorization'] = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const newToken = response.headers['bearer'];
    if (newToken) {
      bearerToken = newToken;
    }
    return response;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const setBearerToken = (token) => {
  bearerToken = token;
};

export default api;