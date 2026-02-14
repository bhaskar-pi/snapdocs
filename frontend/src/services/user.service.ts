import { GET, PUT } from "@/api/http";
import { User } from "@/types/models/user";

export const usersApi = {
  getUser() {
    return GET<User>("/user");
  },

  updateUser(user: User) {
    return PUT<User>(`/user/${user.id}`, user);
  },
};
