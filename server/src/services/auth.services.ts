import bcrypt from "bcrypt";

import {
  createSession,
  findValidSession,
  revokeSessionBySessionId,
} from "@repositories/session.repository";
import { createUser, getUserByEmail } from "@repositories/user.repository";
import {
  LoginRequest,
  UserRegisterRequest,
} from "@models/requests/auth.request";
import { User } from "@database/schema/users.schema";
import {
  getSecurityTokens,
  hashRefreshToken,
  verifyRefreshToken,
} from "@utils/session";
import { TokenValidity } from "@enums/session";

export async function registerUser(data: UserRegisterRequest) {
  const { firstName, lastName, email, phoneNumber, password } = data;

  const existsUser = await getUserByEmail(email);
  if (existsUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: passwordHash,
  } as User);
}

export async function loginUser(data: LoginRequest) {
  const { email, password } = data;

  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials.");
  }

  const { accessToken, refreshToken } = getSecurityTokens(user.id, user.email);

  const refreshTokenHash = hashRefreshToken(refreshToken);
  const expiresAt = new Date(Date.now() + TokenValidity.ONE_DAY);

  const session = await createSession(user.id, refreshTokenHash, expiresAt);

  return {
    session: {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
    },
    user,
    refreshToken,
    accessToken,
  };
}

export async function rotateAccessToken(token: string) {
  const payload = verifyRefreshToken(token); // it will throw error if token has issue/expired

  const refreshTokenHash = hashRefreshToken(token);
  const session = await findValidSession(payload.userId, refreshTokenHash);
  if (!session) {
    throw new Error("Invalid session");
  }

  // Rotate refresh token only when it is close to expiry.
  // This avoids unnecessary DB writes while limiting the lifetime
  // of stolen refresh tokens.
  const shouldRotate =
    session.expiresAt.getTime() - Date.now() < TokenValidity.ONE_HOUR;

  const { accessToken, refreshToken } = getSecurityTokens(
    payload.userId,
    payload.email
  );

  if (!shouldRotate) {
    return { accessToken, refreshToken: null, ...session };
  }

  // Revoke old session so the previous refresh token
  // can no longer be used
  await revokeSessionBySessionId(session.id);

  // Create a new session for the newly issued refresh token.
  const newSession = await createSession(
    payload.userId,
    hashRefreshToken(refreshToken),
    new Date(Date.now() + TokenValidity.ONE_DAY)
  );

  return { ...newSession, accessToken, refreshToken };
}
