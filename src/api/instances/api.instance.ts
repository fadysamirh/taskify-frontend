import { Environments } from "@/Environments";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const clientInstance = axios.create({ baseURL: Environments.API_URL });
const privateClientInstance = axios.create({ baseURL: Environments.API_URL });
export const setToken = (token: string | undefined) => {
  privateClientInstance.defaults.headers.Authorization = `Bearer ${token}`;
};

const requestInterceptor = async (
  isPrivate: boolean,
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (isPrivate) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return Promise.reject(new Error("TOKEN_MISSING_ERROR"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

clientInstance.interceptors.request.use(
  (config) => requestInterceptor(false, config),
  (error) => Promise.reject(error),
);

privateClientInstance.interceptors.request.use(
  (config) => requestInterceptor(true, config),
  (error) => Promise.reject(error),
);

export const publicApi = (): AxiosInstance => {
  return clientInstance;
};

export const privateApi = (): AxiosInstance => {
  return privateClientInstance;
};
