import { queryClient } from "@/lib/queryClient";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoggingOut: false,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    set({ isLoggingOut: true });
    // Simula proceso (API, limpieza, etc)
    await new Promise((res) => setTimeout(res, 800));
    localStorage.removeItem("token");
    queryClient.clear();
    set({ token: null, isAuthenticated: false, isLoggingOut: false });
  },
}));
