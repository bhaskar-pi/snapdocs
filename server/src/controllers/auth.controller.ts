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

export const loginHandler = async (request: Request, response: Response) => {
  try {
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
    return response.status(200).json({
      message: "Login successfully.",
      session,
      user,
      isAuthorized: true,
    });
  } catch (error: any) {
    console.error("Login failed", error);
    return response.status(401).json({
      message: "Login failed. Please check your credentials and try again",
    });
  }
};

export const registerUserHandler = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = await registerUser(request.body);
    return response.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || "Registration failed. Please try again",
    });
  }
};

export const logoutHandler = async (request: Request, response: Response) => {
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

export const refreshHandler = async (request: Request, response: Response) => {
  try {
    const token = request.cookies.refreshToken;
    if (!token) {
      return response.status(401).json({ message: "Missing refresh token" });
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

    return response.status(200).json({
      message: "Refresh successfully.",
      session,
      user,
      isAuthorized: true,
    });
  } catch (error: any) {
    return response.status(401).json({
      message: error.message || "Refresh failed",
    });
  }
};

export const updatePasswordHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.user;
  const passwords = request.body as UpdatePasswordRequest;

  if (passwords.confirmNewPassword !== passwords.newPassword) {
    throw new Error("Password not matched");
  }

  const user = await getUserById(authUser?.id || "");
  const passwordHash = await bcrypt.hash(passwords.newPassword, 10);

  const userDetails: User = {
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(),
    password: passwordHash,
  };

  return updateUser(userDetails);
};
