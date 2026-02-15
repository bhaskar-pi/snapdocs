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
 *
 * Example:
 * If 3 API requests fail together (because token expired),
 * we want ONLY 1 refresh call.
 */
let isRefreshing = false;

/**
 * This array stores requests that failed while refresh is running.
 *
 * Think of this as a waiting line.
 *
 * Example:
 * - /getUser → 401
 * - /getTemplates → 401
 * - /getClients → 401
 *
 * Only first request starts refresh.
 * The other two wait inside this queue.
 */
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

/**
 * After refresh finishes:
 *
 * If refresh SUCCESS:
 *   → retry all waiting requests
 *
 * If refresh FAILS:
 *   → reject all waiting requests
 */
const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      // If refresh failed → reject waiting request
      promise.reject(error);
    } else {
      // If refresh succeeded → allow request to continue
      promise.resolve(true);
    }
  });

  // Clear queue after processing
  failedQueue = [];
};

/**
 * RESPONSE INTERCEPTOR
 *
 * This runs automatically whenever an API call fails.
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiError>) => {
    /**
     * originalRequest contains:
     * - URL (ex: /clients)
     * - method (GET, POST)
     * - body
     * - headers
     *
     * Basically everything needed to retry the request.
     */
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    /**
     * If request failed with 401 (Unauthorized)
     * AND we haven't retried it before
     */

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest.url?.includes("/refresh")
    ) {
      // Mark this request as retried
      // This prevents infinite loop
      originalRequest._retry = true;

      /**
       * CASE 1:
       * If refresh already running
       *
       * Example:
       * 3 API calls failed.
       * First one started refresh.
       * This second one must WAIT.
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            /**
             * When refresh succeeds:
             * Retry original request
             */
            resolve: () => resolve(apiClient(originalRequest)),

            /**
             * If refresh fails:
             * Reject this request
             */
            reject,
          });
        });
      }

      /**
       * CASE 2:
       * This is the FIRST request that failed.
       * So we start refresh.
       */
      isRefreshing = true;

      try {
        /**
         * Call backend /refresh
         *
         * Backend:
         * - verifies refreshToken
         * - sets new accessToken cookie
         */
        await apiClient.post("/refresh");

        /**
         * Refresh SUCCESS
         *
         * Now:
         * - Resume all waiting requests
         */
        processQueue();

        /**
         * Retry the original failed request
         *
         * Example:
         * If /clients failed earlier,
         * we retry /clients again.
         */
        return apiClient(originalRequest);
      } catch (refreshError) {
        /**
         * Refresh FAILED
         *
         * That means refresh token expired.
         * User must login again.
         */

        // Reject all waiting requests
        processQueue(refreshError);

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        // Refresh process finished
        isRefreshing = false;
      }
    }

    /**
     * If error is not 401,
     * just return normal error
     */
    return Promise.reject(error);
  },
);
