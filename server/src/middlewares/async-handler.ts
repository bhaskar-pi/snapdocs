import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@models/express";

export const asyncHandler =
  (fn: any) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      if (result !== undefined && !res.headersSent) {
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  };
