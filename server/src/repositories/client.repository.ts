import { db } from "@database/drizzle";
import { Client, clientsTable } from "@database/schema/client.schema";
import { ClientRequest } from "@models/requests/create-doc-request";
import { and, eq } from "drizzle-orm";

export async function getClientByEmail(
  userId: string,
  clientEmail: string
): Promise<Client> {
  const [result] = await db
    .select()
    .from(clientsTable)
    .where(
      and(eq(clientsTable.userId, userId), eq(clientsTable.email, clientEmail))
    )
    .limit(1);

  return result;
}

export async function createClient(
  userId: string,
  client: ClientRequest
): Promise<Client | undefined> {
  const [result] = await db
    .insert(clientsTable)
    .values({
      ...client,
      userId,
    })
    .returning();

  return result;
}
