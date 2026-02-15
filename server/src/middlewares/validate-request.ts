import { ZodType } from "zod";
import { Response, NextFunction, Request } from "express";
import { AuthenticatedRequest } from "@models/express";
import { verifyAccessToken } from "@utils/session";
import { User } from "@database/schema/users.schema";

/**
 * Validation middleware factory.
 *
 * This function creates an Express middleware that:
 * 1. Validates `req.body` against the provided Zod schema.
 * 2. Stops the request immediately if validation fails.
 * 3. Attaches the validated & sanitized data to `req.body`.
 *
 * @param schema - Zod schema used to validate the request body
 * @returns Express middleware function
 */

export const validate = (schema: ZodType) => {
  return (request: Request, response: Response, nextFunction: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    request.body = result.data;
    nextFunction();
  };
};

/**
 * authenticate
 *
 * Authentication middleware that:
 * - Reads the access token from cookies
 * - Verifies and decodes the JWT
 * - Attaches the decoded user payload to `req.user`
 * - Blocks the request if authentication fails
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      code: "TOKEN_EXPIRED",
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.authUser = payload as User;
    return next();
  } catch {
    // Access token expired or invalid → client should refresh
    res.clearCookie("accessToken");

    return res.status(401).json({
      message: "Access token expired",
      code: "TOKEN_EXPIRED",
    });
  }
};
