import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_URL,
});

export const apiCore = axios.create({
  baseURL: import.meta.env.VITE_API_CORE_URL,
});

// Interceptor para token
apiCore.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
