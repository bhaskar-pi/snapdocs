import { eq, and, isNull, gt } from "drizzle-orm";

import { db } from "@database/drizzle";
import { sessionsTable } from "@database/schema/sessions.schema";
import { Session } from "@models/session";

export async function createSession(
  userId: string,
  refreshTokenHash: string,
  expiresAt: Date
) {
  const session = await db
    .insert(sessionsTable)
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
    .from(sessionsTable)
    .where(
      and(
        eq(sessionsTable.userId, userId),
        eq(sessionsTable.refreshTokenHash, refreshTokenHash),
        isNull(sessionsTable.revokedAt),
        gt(sessionsTable.expiresAt, new Date())
      )
    )
    .limit(1);

  return session ?? null;
}

export async function revokeSessionBySessionId(
  sessionId: string
): Promise<void> {
  await db
    .update(sessionsTable)
    .set({
      revokedAt: new Date(),
    })
    .where(eq(sessionsTable.id, sessionId));
}

export async function revokeSessionByToken(
  userId: string,
  refreshTokenHash: string
): Promise<void> {
  await db
    .update(sessionsTable)
    .set({ revokedAt: new Date() })
    .where(
      and(
        eq(sessionsTable.userId, userId),
        eq(sessionsTable.refreshTokenHash, refreshTokenHash),
        isNull(sessionsTable.revokedAt)
      )
    );
}
