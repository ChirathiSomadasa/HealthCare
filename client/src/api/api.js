import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:5002";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    // Get the auth token from the store
    const authToken = useAuthStore.getState().token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
