import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@models/express";
import { User } from "@database/schema/users.schema";
import { AppError } from "@utils/error";

export const asyncHandler =
  (fn: any) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      if (result !== undefined && !res.headersSent) {
        const { statusCode = 200, ...data } = result;

        res.status(statusCode).json(data);
      }
    } catch (err) {
      next(err);
    }
  };

export const protectedHandler = <TBody>(
  handler: (user: User, body: TBody) => Promise<any>,
) =>
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.authUser;

    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    const body = req.body as TBody;

    return handler(user, body);
  });
