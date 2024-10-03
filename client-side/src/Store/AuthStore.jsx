import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Signup function
  signup: async (name, username, email, phone, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        username,
        email,
        phone,
        password,
      });
      const { user, token } = response.data; // Destructure token from response

      // Save both user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      set({
        user: user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // Login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { user, token } = response.data; // Destructure token from response

      // Save both user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem("user");
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));

// Sync across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "user") {
    const user = event.newValue ? JSON.parse(event.newValue) : null;
    const isAuthenticated = !!user;
    useAuth.getState().set({ user, isAuthenticated });
  }
});
