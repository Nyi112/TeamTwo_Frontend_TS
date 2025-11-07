/** @format */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveAuthData,
  clearAuthData,
  isTokenExpired,
  getUsername,
  getRoles,
} from "../auth.js";

// Define response type from refresh-token API
interface RefreshTokenResponse {
  token: string; // or accessToken
  refreshToken?: string;
  roles?: string[];
}

// Create Axios instance
const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// Helper: refresh access token using refresh token
export const tryRefreshToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  const username = getUsername();

  if (!refreshToken || !username) return false;

  try {
    const res = await axios.post<RefreshTokenResponse>(
      "http://localhost:8080/api/auth/refresh-token",
      { refreshToken }
    );

    const newAccessToken = res.data.token;
    const newRefreshToken = res.data.refreshToken || refreshToken;

    const newRoles = res.data.roles || getRoles() || ["ROLE_GUEST"];

    saveAuthData({
      username,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      roles: newRoles, // optionally include roles if returned from backend
    });

    return true;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    clearAuthData();
    return false;
  }
};

// Request interceptor: attach token
API.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        token = getAccessToken();
      } else {
        window.location.href = "/login";
        return Promise.reject("Access token expired");
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 (unauthorized)
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await tryRefreshToken();
      if (refreshed) {
        const token = getAccessToken();
        if (originalRequest.headers && token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return axios(originalRequest);
      } else {
        clearAuthData();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Branch API
export const branchApi = {
  getAll: () => API.get("/branches"),
  getById: (id: number) => API.get(`/branches/${id}`),
  create: (branch: any) => API.post("/branches/create", branch),
  update: (id: number, branch: any) => API.put(`/branches/${id}`, branch),
  delete: (id: number) => API.delete(`/branches/${id}`),
  search: (name: string) => API.get(`/branches/search?name=${name}`),
  checkExists: (branchName: string) =>
    API.get(`/branches/exists?branchName=${branchName}`),
};

// Building API
export const buildingApi = {
  getAll: () => API.get("/buildings"),
  getById: (id: number) => API.get(`/buildings/${id}`),
  getByBranchId: (branchId: number) => API.get(`/buildings/branch/${branchId}`),
  create: (building: any) => API.post("/buildings", building),
  update: (id: number, building: any) => API.put(`/buildings/${id}`, building),
  delete: (id: number) => API.delete(`/buildings/${id}`),
  search: (branchId: number, name: string) =>
    API.get(`/buildings/search?branchId=${branchId}&name=${name}`),
};

// Level API
export const levelApi = {
  getAll: () => API.get("/levels"),
  getById: (id: number) => API.get(`/levels/${id}`),
  getByBuildingId: (buildingId: number) =>
    API.get(`/levels/building/${buildingId}`),
  create: (level: any) => API.post("/levels", level),
  update: (id: number, level: any) => API.put(`/levels/${id}`, level),
  delete: (id: number) => API.delete(`/levels/${id}`),
  search: (buildingId: number, name: string) =>
    API.get(`/levels/search?buildingId=${buildingId}&name=${name}`),
};
export default API;
