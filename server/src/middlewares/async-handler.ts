import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@models/express";
import { AppError } from "@utils/error";
import { AuthenticatedUser } from "@models/user";

export const asyncHandler =
  (fn: any) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      if (result !== undefined && !res.headersSent) {
        const { statusCode = 200, ...data } = result;

        if (statusCode === 204) {
          res.status(204).send();
        } else {
          res.status(statusCode).json(data);
        }
      }
    } catch (err) {
      console.error("Failed", err);
      next(err);
    }
  };

export const protectedHandler = <
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown,
>(
  handler: (context: {
    authUser: AuthenticatedUser;
    request: TBody;
    params: TParams;
    query: TQuery;
    res: Response;
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }) => Promise<any>,
) =>
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const authUser = req.authUser;

    if (!authUser) {
      throw new AppError("Authentication required", 401);
    }

    return handler({
      authUser,
      request: req.body as TBody,
      params: req.params as TParams,
      query: req.query as TQuery,
      res,
      file: req.file,
      files: req.files as Express.Multer.File[],
    });
  });

export const unProtectedHandler = <
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown,
>(
  handler: (context: {
    request: TBody;
    params: TParams;
    query: TQuery;
    res: Response;
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }) => Promise<any>,
) =>
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    return handler({
      request: req.body as TBody,
      params: req.params as TParams,
      query: req.query as TQuery,
      res,
      file: req.file,
      files: req.files as Express.Multer.File[],
    });
  });
