import { User } from "@database/schema/users.schema";
import { AuthenticatedUser } from "@models/user";
import { getUserById, updateUser } from "@repositories/user.repository";
import { AppError } from "@utils/error";

export const getUserHandler = async ({
  authUser,
}: {
  authUser: AuthenticatedUser;
}) => {
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

export const updateUserHandler = async ({
  request,
  params,
}: {
  request: Partial<User>;
  params: { userId: string };
}) => {
  if (!params.userId) {
    throw new AppError("User Id not found.", 400);
  }

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
