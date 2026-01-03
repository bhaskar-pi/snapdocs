import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return (request: Request, response: Response, nextFunction: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    nextFunction();
  };
};
