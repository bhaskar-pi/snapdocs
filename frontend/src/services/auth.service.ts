import { POST } from "@/api/http";
import { LoginResponse, SignUpForm, UpdatePassword } from "@/types/models/auth";

export const authApi = {
  login(email: string, password: string) {
    return POST<LoginResponse>("/login", {
      email,
      password,
    });
  },

  signup(data: SignUpForm) {
    return POST("/register", { ...data });
  },

  logout() {
    return POST("/logout");
  },

  refresh() {
    return POST<LoginResponse>("/refresh");
  },

  updatePassword(passwords: UpdatePassword) {
    return POST("/update-password", passwords);
  },
};
