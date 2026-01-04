import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "@config/env";

export function generateAccessToken(userId: string, email: string): string {
  const token = jwt.sign({ userId, email }, env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });

  return token;
}

export function verifyAccessToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
    return payload;
  } catch (error) {
    throw error;
  }
}

export function generateRefreshToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyRefreshToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
    return payload as JwtPayload;
  } catch (error) {
    throw error;
  }
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
