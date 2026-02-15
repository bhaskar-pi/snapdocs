import { DateString } from "@models/date";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshSessionRequest {
  id: string;
  userId: string;
  refreshToken: string | null;
  createdAt: DateString;
  expiresAt: DateString | null;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
