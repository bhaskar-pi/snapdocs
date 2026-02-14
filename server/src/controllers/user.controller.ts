import { User } from "@database/schema/users.schema";
import { AuthenticatedRequest } from "@models/express";
import { getUserById, updateUser } from "@repositories/user.repository";

export const getUserHandler = async (request: AuthenticatedRequest) => {
  const userId = request.user?.id;

  if (!userId) {
    throw new Error("Missing user details");
  }

  const user = await getUserById(userId);
  return user;
};

export const updateUserHandler = async (request: AuthenticatedRequest) => {
  const userId = request.user?.id;

  if (!userId) {
    throw new Error("Missing user details");
  }

  const userDetails: User = {
    ...request.body,
    createdAt: new Date(request.body.createdAt),
    updatedAt: new Date(),
  };

  const user = await updateUser(userDetails);
  return user;
};
