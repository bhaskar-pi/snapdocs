import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * AuthenticatedRequest
 *
 * Extends the Express Request object by attaching
 * the authenticated user's JWT payload.
 */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
