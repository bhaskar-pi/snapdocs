import { User } from "./user";
import { IndustryType } from "../enums/industry";

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessName: string;
  businessType: IndustryType;
  otherBusinessType?: string;
}

export interface Session {
  id: string;
  userId: string;
  accessToken: string;
  expiresAt: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export type LoginResponse = AuthResponse;
export type RefreshResponse = AuthResponse;

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
