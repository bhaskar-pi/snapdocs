import { authService } from "@services/auth.services";
import { Request, Response } from "express";

export const login = async (request: Request, response: Response) => {};

export const register = async (request: Request, response: Response) => {
  try {
    const user = await authService.register(request.body);
    return response.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message,
    });
  }
};
