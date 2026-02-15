import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ApiError } from "@/types/models/misc";

/**
 * This is your main axios instance.
 * All API calls (GET, POST, etc.) use this.
 *
 * withCredentials: true
 * → allows cookies (accessToken, refreshToken) to be sent automatically
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

/**
 * This flag prevents multiple /refresh calls at the same time.
 */
let isRefreshing = false;

/**
 * Queue for requests waiting during refresh
 */
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

/**
 * Process queued requests after refresh
 */
const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(true);
    }
  });

  failedQueue = [];
};

/**
 * RESPONSE INTERCEPTOR
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const status = error.response?.status;
    const errorCode = error.response?.data?.code;
    const requestUrl = originalRequest?.url ?? "";

    console.log({ status, errorCode, requestUrl });

    /**
     * If we don't even have config → just reject
     */
    if (!originalRequest) {
      return Promise.reject(error);
    }

    /**
     * If refresh endpoint itself fails (401)
     * → refresh token expired
     * → force login
     */
    if (requestUrl.includes("/refresh") && status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    /**
     * If access token expired
     * AND request not retried yet
     */
    if (
      status === 401 &&
      errorCode === "ACCESS_TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      /**
       * CASE 1: refresh already running
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      }

      /**
       * CASE 2: first request triggering refresh
       */
      isRefreshing = true;

      try {
        await apiClient.post("/refresh");

        processQueue();

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    /**
     * If 401 but NOT access token expired
     * → invalid / missing / refresh expired
     * → logout immediately
     */
    if (
      status === 401 ||
      errorCode === "ACCESS_TOKEN_INVALID" ||
      errorCode === "ACCESS_TOKEN_MISSING" ||
      errorCode === "REFRESH_TOKEN_EXPIRED"
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
