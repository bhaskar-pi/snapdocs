import { User } from "@database/schema/users.schema";
import { Request } from "express";

/**
 * AuthenticatedRequest
 *
 * Extends the Express Request object by attaching
 * the authenticated user's JWT payload.
 */
export interface AuthenticatedRequest extends Request {
  user?: User;
  data?: unknown;
}
