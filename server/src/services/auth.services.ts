import bcrypt from "bcrypt";

import {
  createSession,
  findValidSession,
  revokeSessionBySessionId,
} from "@repositories/session.repository";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "@repositories/user.repository";
import {
  LoginRequest,
  UserRegisterRequest,
} from "@models/requests/auth.request";
import { User } from "@database/schema/users.schema";
import {
  generateAccessToken,
  generateRefreshToken,
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
  const oldSession = await findValidSession(payload.userId, refreshTokenHash);
  if (!oldSession) {
    throw new Error("Invalid session");
  }

  // Rotate refresh token only when it is close to expiry.
  // This avoids unnecessary DB writes while limiting the lifetime
  // of stolen refresh tokens.
  const shouldRotate =
    oldSession.expiresAt.getTime() - Date.now() < TokenValidity.ONE_HOUR;

  const accessToken = generateAccessToken(payload.userId, payload.email);

  const user = await getUserById(payload.userId);

  if (!shouldRotate) {
    return { session: { accessToken, id: oldSession.id }, user };
  }

  // Revoke old session so the previous refresh token
  // can no longer be used
  await revokeSessionBySessionId(oldSession.id);

  const newRefreshToken = generateRefreshToken(payload.userId, payload.email);

  // Create a new session for the newly issued refresh token.
  const newSession = await createSession(
    payload.userId,
    hashRefreshToken(newRefreshToken),
    new Date(Date.now() + TokenValidity.ONE_DAY),
  );

  return { session: { accessToken, id: newSession.id }, user, newRefreshToken };
}
