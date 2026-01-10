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

export interface LoginResponse {
  user: User;
  session: Session;
}
