import { eq, and, isNull, gt } from "drizzle-orm";
import { db } from "@database/drizzle";
import { sessions } from "@database/schema/sessions.schema";
import { Session } from "@models/session";

export async function createSession(
  userId: string,
  refreshTokenHash: string,
  expiresAt: Date
) {
  const session = await db
    .insert(sessions)
    .values({
      userId,
      refreshTokenHash,
      expiresAt,
    })
    .returning();

  return session[0];
}

export async function findValidSession(
  userId: string,
  refreshTokenHash: string
): Promise<Session | null> {
  const [session] = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.userId, userId),
        eq(sessions.refreshTokenHash, refreshTokenHash),
        isNull(sessions.revokedAt),
        gt(sessions.expiresAt, new Date())
      )
    )
    .limit(1);

  return session ?? null;
}

export async function revokeSession(sessionId: string): Promise<void> {
  await db
    .update(sessions)
    .set({
      revokedAt: new Date(),
    })
    .where(eq(sessions.id, sessionId));
}
