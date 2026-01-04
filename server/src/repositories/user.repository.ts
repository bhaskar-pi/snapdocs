import { eq } from "drizzle-orm";
import { db } from "@database/drizzle";
import { users } from "@database/schema/users.schema";
import { User } from "@models/user";

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0];
}

export async function createUser(data: User): Promise<User> {
  const user = await db
    .insert(users)
    .values({
      ...data,
    })
    .returning();

  return user[0];
}
