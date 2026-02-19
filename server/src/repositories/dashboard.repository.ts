import { db } from "@database/drizzle";
import { checklistItemsTable } from "@database/schema/checklist-items.schema";
import { clientsTable } from "@database/schema/clients.schema";
import { requestsTable } from "@database/schema/document-requests.schema";
import { ChecklistStatus, RequestStatus } from "@enums/document-requests";
import { desc, eq, sql } from "drizzle-orm";

const requiredPendingChecklist = sql`
  ${checklistItemsTable.status} = ${ChecklistStatus.PENDING}
  AND ${checklistItemsTable.isRequired} = true
`;

const activeRequestCondition = sql`
  ${requestsTable.status} IN (${RequestStatus.PENDING}, ${RequestStatus.IN_PROGRESS})
`;

export async function getDashboardMetricsByUserId(userId: string) {
  const [result] = await db
    .select({
      activeRequestsCount: sql<number>`
        COUNT(*) FILTER (WHERE ${activeRequestCondition})
      `,
      completedRequestCount: sql<number>`
        COUNT(*) FILTER (
          WHERE ${requestsTable.status} = ${RequestStatus.COMPLETED}
          AND COALESCE(
            ${requestsTable.completedAt},
            ${requestsTable.updatedAt},
            ${requestsTable.createdAt}
          ) >= NOW() - INTERVAL '7 days'
        )
      `,
      pendingDocumentsCount: sql<number>`
        COUNT(*) FILTER (WHERE ${requiredPendingChecklist})
      `,
      overdueItemsCount: sql<number>`
        COUNT(*) FILTER (
          WHERE ${requiredPendingChecklist}
          AND ${requestsTable.dueDate} IS NOT NULL
          AND ${requestsTable.dueDate} < NOW()
          AND ${activeRequestCondition}
        )
      `,
    })
    .from(requestsTable)
    .leftJoin(
      checklistItemsTable,
      eq(checklistItemsTable.requestId, requestsTable.id),
    )
    .where(eq(requestsTable.userId, userId));

  return (
    result ?? {
      activeRequestsCount: 0,
      completedRequestCount: 0,
      pendingDocumentsCount: 0,
      overdueItemsCount: 0,
    }
  );
}

export async function getRecentRequestsByUserId(userId: string, limit = 8) {
  return db
    .select({
      requestId: requestsTable.id,
      requestTitle: requestsTable.title,
      createdAt: requestsTable.createdAt,
      dueDate: requestsTable.dueDate,
      status: requestsTable.status,
      clientId: clientsTable.id,
      clientName: clientsTable.fullName,
    })
    .from(requestsTable)
    .innerJoin(clientsTable, eq(clientsTable.id, requestsTable.clientId))
    .where(eq(requestsTable.userId, userId))
    .orderBy(desc(requestsTable.createdAt))
    .limit(limit);
}
