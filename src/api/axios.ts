import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const apiAuth = axios.create({
  baseURL: "https://dev.apinetbo.bekindnetwork.com",
});

export const apiCore = axios.create({
  baseURL: "https://dev.api.bekindnetwork.com",
});

// Interceptor para token
apiCore.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
