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
