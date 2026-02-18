export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  url?: string;
}

export interface Option {
  key: string | number;
  value: string | number;
  label: string | number;
}
