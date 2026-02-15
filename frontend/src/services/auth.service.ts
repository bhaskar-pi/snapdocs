import { POST } from "@/api/http";
import { LoginResponse, SignUpForm, UpdatePassword } from "@/types/models/auth";
import { ApiResponse } from "@/types/models/misc";

export const authApi = {
  login(email: string, password: string) {
    return POST<ApiResponse<LoginResponse>>("/login", {
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
    return POST<ApiResponse<LoginResponse>>("/refresh");
  },

  updatePassword(passwords: UpdatePassword) {
    return POST("/update-password", passwords);
  },
};
