import { User } from "@database/schema/users.schema";
import { getUserById, updateUser } from "@repositories/user.repository";
import { AppError } from "@utils/error";

export const getUserHandler = async (authUser: User) => {
  const user = await getUserById(authUser.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    message: "User retrieved successfully",
    statusCode: 200,
    data: user,
  };
};

export const updateUserHandler = async (
  authUser: User,
  request: Partial<User>,
) => {
  const userDetails = {
    ...request,
    createdAt: new Date(request.createdAt!),
    updatedAt: new Date(),
  };

  const user = await updateUser(userDetails);
  return {
    message: "Your details have been updated successfully.",
    statusCode: 200,
    data: user,
  };
};
