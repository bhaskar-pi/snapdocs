import { Request } from "express";
import { AuthenticatedUser } from "./user";

/**
 * AuthenticatedRequest
 *
 * Extends the Express Request object by attaching
 * the authenticated user's data.
 */
export interface AuthenticatedRequest extends Request {
  authUser?: AuthenticatedUser;
  data?: unknown;
}
