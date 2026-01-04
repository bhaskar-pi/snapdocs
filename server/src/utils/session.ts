import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

import env from "@config/env";
import { JWT_ACCESS_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_EXPIRATION } from "@config/constants";

export function generateAccessToken(userId: string, email: string): string {
  const token = jwt.sign({ userId, email }, env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
  });

  return token;
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
  return payload as JwtPayload;
}

export function generateRefreshToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
  });
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
  return payload as JwtPayload;
}

export function getSecurityTokens(
  userId: string,
  email: string
): { accessToken: string; refreshToken: string } {
  const accessToken = generateAccessToken(userId, email);
  const refreshToken = generateRefreshToken(userId, email);

  return { accessToken, refreshToken };
}

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
