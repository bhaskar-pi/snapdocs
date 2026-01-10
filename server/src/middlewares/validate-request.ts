import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "@models/express";
import { verifyAccessToken } from "@utils/session";

/**
 * Validation middleware factory.
 *
 * This function creates an Express middleware that:
 * 1. Validates `req.body` against the provided Zod schema.
 * 2. Stops the request immediately if validation fails.
 * 3. Attaches the validated & sanitized data to `req.body`.
 *
 * Why this exists:
 * - Ensures controllers never deal with raw `req.body`
 * - Prevents duplicate extraction/validation logic
 * - Keeps business logic clean and type-safe
 *
 * How it is used:
 * ```ts
 * router.post(
 *   "/register",
 *   validate(registerSchema),
 *   registerController
 * );
 * ```
 *
 * In the controller:
 * ```ts
 * const data = req.body (validated data from zod);
 * ```
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

    const token = request.cookies.get("accessToken").value;
    verifyAccessToken(token);

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
 *
 * Usage:
 * ```ts
 * router.get("/documents", authenticate, controller);
 * ```
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
