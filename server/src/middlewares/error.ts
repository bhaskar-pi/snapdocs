import { AppError } from "@utils/error";
import { Response, Request, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      status: err.statusCode,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
}
