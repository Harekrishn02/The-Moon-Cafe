// src/axiosInstance.js
import axios from "axios";

// 🌍 Base URL (adjust if backend runs on a different port or domain)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ Handle 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized — clearing token");
      localStorage.removeItem("token");
      window.location.href = "/admin/login"; // optional auto redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
