import { GET, PUT } from "@/api/http";
import { ApiResponse } from "@/types/models/misc";
import { User } from "@/types/models/user";

export const usersApi = {
  getUser() {
    return GET<ApiResponse<User>>("/user");
  },

  updateUser(user: User) {
    return PUT<ApiResponse<User>>(`/user/${user.id}`, user);
  },
};
