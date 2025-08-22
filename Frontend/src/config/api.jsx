import axios from "axios";

// ⚠️ Change ONLY this line when you deploy
export const API_HOST = "http://localhost:8000"; // e.g. "https://nmf-backend.onrender.com"

// Normalize and add /api
export const API_BASE_URL = `${API_HOST.replace(/\/+$/, "")}/api`;

// Shared axios instance (used by all pages)
export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");
  const token = adminToken || userToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
