import { User } from "./user.model";

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
