import { apiClient } from "./axios";

export const GET = async <T>(url: string, params?: object): Promise<T> => {
  const res = await apiClient.get<T>(url, { params });
  return res.data;
};

export const POST = async <T>(url: string, data?: unknown): Promise<T> => {
  const res = await apiClient.post<T>(url, data);
  return res.data;
};

export const PUT = async <T>(url: string, data?: unknown): Promise<T> => {
  const res = await apiClient.put<T>(url, data);
  return res.data;
};

export const PATCH = async <T>(url: string, data?: unknown): Promise<T> => {
  const res = await apiClient.patch<T>(url, data);
  return res.data;
};

export const DELETE = async <T>(url: string): Promise<T> => {
  const res = await apiClient.delete<T>(url);
  return res.data;
};
