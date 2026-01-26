import { eq } from "drizzle-orm";
import { db } from "@database/drizzle";

import { User, usersTable } from "@database/schema/users.schema";

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user[0];
}

export async function getUserById(id: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return user[0];
}

export async function createUser(data: User): Promise<User> {
  const user = await db
    .insert(usersTable)
    .values({
      ...data,
    })
    .returning();

  return user[0];
}
