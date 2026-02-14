import crypto from "crypto";
import jwt from "jsonwebtoken";

import env from "@config/env";
import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION,
  SEVEN_DAYS,
} from "@config/constants";
import { User } from "@database/schema/users.schema";

export function generateAccessToken(user: User): string {
  const token = jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.lastName,
    },
    env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
    },
  );

  return token;
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
  return payload as User;
}

export function generateRefreshToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.lastName,
    },
    env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
    },
  );
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
  return payload as User;
}

export function getSecurityTokens(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
}

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateDocumentsRequestToken(
  userId: string,
  clientId: string,
  requestId: string,
) {
  const token = jwt.sign(
    { userId, clientId, requestId },
    env.JWT_DOCUMENTS_SEND_SECRET,
    { expiresIn: SEVEN_DAYS },
  );

  return token;
}

export function verifyDocumentsRequestToken(token: string) {
  const payload = jwt.verify(token, env.JWT_DOCUMENTS_SEND_SECRET);
  return payload as { clientId: string; userId: string; requestId: string };
}
