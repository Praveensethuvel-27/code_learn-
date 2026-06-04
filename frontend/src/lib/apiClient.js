import axios from "axios";

// In production, we always want to use the relative /api path (same domain)
// In development, we use VITE_API_URL if defined, fallback to /api
const getBaseURL = () => {
  if (import.meta.env.PROD || window.location.hostname !== "localhost") {
    return "/api";
  }
  return import.meta.env.VITE_API_URL || "/api";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

