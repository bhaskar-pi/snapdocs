import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@database/drizzle";
import { users } from "@database/schema/users.schema";
import {
  LoginRequest,
  UserRegisterRequest,
} from "@models/requests/auth.request";

class AuthService {
  constructor() {}

  login(data: LoginRequest) {
    const { email, password } = data;
  }

  async register(data: UserRegisterRequest) {
    const { firstName, lastName, email, phoneNumber, password } = data;

    const existsUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existsUser.length) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: passwordHash,
      })
      .returning();

    return result[0];
  }
}

export const authService = new AuthService();
