import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

/**
 * Validation middleware factory.
 *
 * This function creates an Express middleware that:
 * 1. Validates `req.body` against the provided Zod schema.
 * 2. Stops the request immediately if validation fails.
 * 3. Attaches the validated & sanitized data to `req.validated`.
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

    request.body = result.data;
    nextFunction();
  };
};
