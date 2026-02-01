import { db } from "@database/drizzle";
import { checklistItemsTable } from "@database/schema/checklist-items.schema";
import { Client, clientsTable } from "@database/schema/clients.schema";
import { requestsTable } from "@database/schema/document-requests.schema";
import { ChecklistStatus, RequestStatus } from "@enums/document-requests";
import { ClientRequest } from "@models/requests/documents-request";
import { and, eq, inArray, sql } from "drizzle-orm";

export async function getClientByEmail(
  userId: string,
  clientEmail: string,
): Promise<Client> {
  const [result] = await db
    .select()
    .from(clientsTable)
    .where(
      and(eq(clientsTable.userId, userId), eq(clientsTable.email, clientEmail)),
    )
    .limit(1);

  return result;
}

export async function createClient(
  userId: string,
  client: ClientRequest,
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

export async function getClientsByUserId(
  userId: string,
): Promise<Client[] | undefined> {
  const clients = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.userId, userId));

  return clients;
}

export async function getClientSummariesByUserId(userId: string) {
  const result = await db
    .select({
      id: clientsTable.id,
      fullName: clientsTable.fullName,
      email: clientsTable.email,
      activeRequests: sql<number>`
      COUNT(DISTINCT ${requestsTable.id})
      FILTER(
        WHERE ${requestsTable.status} IN (${RequestStatus.IN_PROGRESS}, ${RequestStatus.PENDING})
      )
    `,
      totalChecklists: sql<number>`
      COUNT(${checklistItemsTable.id})
    `,
      completedChecklists: sql<number>`
      COUNT(${checklistItemsTable.id})
      FILTER(
        WHERE ${checklistItemsTable.status} = ${ChecklistStatus.RECEIVED}
      )
    `,
      status: sql<RequestStatus>`
      CASE
        WHEN BOOL_OR(${requestsTable.status} = ${RequestStatus.IN_PROGRESS}) THEN ${RequestStatus.IN_PROGRESS}
        WHEN BOOL_OR(${requestsTable.status} = ${RequestStatus.PENDING}) THEN ${RequestStatus.PENDING}
        ELSE ${RequestStatus.COMPLETED}
      END
    `,
    })
    .from(clientsTable)
    .leftJoin(
      requestsTable,
      and(
        eq(requestsTable.clientId, clientsTable.id),
        eq(requestsTable.userId, clientsTable.userId),
        inArray(requestsTable.status, [
          RequestStatus.PENDING,
          RequestStatus.IN_PROGRESS,
        ]),
      ),
    )
    .leftJoin(
      checklistItemsTable,
      and(eq(checklistItemsTable.requestId, requestsTable.id)),
    )
    .where(eq(clientsTable.userId, userId))
    .groupBy(clientsTable.id);

  return result;
}
