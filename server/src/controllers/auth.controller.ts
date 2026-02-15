import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  loginUser,
  rotateAccessToken,
  registerUser,
} from "@services/auth.services";
import env from "@config/env";
import { Environment } from "@enums/environment";
import { TokenValidity } from "@enums/session";
import { hashRefreshToken, verifyRefreshToken } from "@utils/session";
import { revokeSessionByToken } from "@repositories/session.repository";
import { AuthenticatedRequest } from "@models/express";
import { UpdatePasswordRequest } from "@models/requests/auth.request";
import { getUserById, updateUser } from "@repositories/user.repository";
import { User } from "@database/schema/users.schema";
import { AppError } from "@utils/error";
import { AuthenticatedUser } from "@models/user";

export const loginHandler = async (
  request: AuthenticatedRequest,
  response: Response,
) => {
  const { session, user, refreshToken, accessToken } = await loginUser(
    request.body,
  );

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === Environment.PRODUCTION,
    sameSite: "strict",
    path: "/",
    maxAge: TokenValidity.ONE_DAY,
  });
  response.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  return {
    message: "Login successfully.",
    data: {
      session,
      user,
      isAuthorized: true,
    },
  };
};

export const registerUserHandler = async (req: AuthenticatedRequest) => {
  await registerUser(req.body);

  return {
    success: true,
    message: "Account registered successfully",
    statusCode: 201,
  };
};

export const logoutHandler = async (
  request: AuthenticatedRequest,
  response: Response,
) => {
  try {
    const token = request.cookies.refreshToken;
    const userPayload = verifyRefreshToken(token);

    const refreshTokenHash = hashRefreshToken(token);

    await revokeSessionByToken(userPayload.id, refreshTokenHash);

    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");

    return response.status(204).send();
  } catch (error) {
    console.error("Error at logout", error);

    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");
    return response.status(204).send();
  }
};

export const refreshHandler = async (
  request: AuthenticatedRequest,
  response: Response,
) => {
  const token = request.cookies.refreshToken;
  if (!token) {
    throw new AppError("Missing refresh token", 401);
  }

  const { session, user, newRefreshToken } = await rotateAccessToken(token);

  if (newRefreshToken) {
    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === Environment.PRODUCTION,
      sameSite: "strict",
      path: "/",
      maxAge: TokenValidity.ONE_DAY,
    });
  }

  response.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  return {
    statusCode: 201,
    message: "Refresh successfully.",
    data: {
      user,
      session: {
        id: session.id,
      },
      isAuthorized: true,
    },
  };
};

export const updatePasswordHandler = async ({
  authUser,
  request,
}: {
  authUser: AuthenticatedUser;
  request: UpdatePasswordRequest;
}) => {
  if (request.confirmNewPassword !== request.newPassword) {
    throw new AppError(
      "New password and confirm new password do not match",
      400,
    );
  }

  const user = await getUserById(authUser.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    request.currentPassword,
    user.password,
  );

  if (!isCurrentPasswordValid) {
    throw new AppError("Invalid current password", 400);
  }

  const passwordHash = await bcrypt.hash(request.newPassword, 10);

  const userDetails: User = {
    ...user,
    updatedAt: new Date(),
    password: passwordHash,
  };

  await updateUser(userDetails);

  return {
    message: "Password updated successfully.",
    statusCode: 200,
  };
};
