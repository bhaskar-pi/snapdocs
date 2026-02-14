import { db } from "@database/drizzle";
import { checklistItemsTable } from "@database/schema/checklist-items.schema";
import { requestsTable } from "@database/schema/document-requests.schema";
import {
  DocumentInsert,
  documentsTable,
} from "@database/schema/documents.schema";
import { ChecklistStatus, RequestStatus } from "@enums/document-requests";
import { and, count, eq, inArray } from "drizzle-orm";

export async function createDocument(
  requestId: string,
  document: DocumentInsert,
) {
  return db.transaction(async (tx) => {
    const [createdDocument] = await tx
      .insert(documentsTable)
      .values({ ...document })
      .returning();

    await tx
      .update(checklistItemsTable)
      .set({ status: ChecklistStatus.RECEIVED })
      .where(eq(checklistItemsTable.id, document.checklistItemId));

    if (!createdDocument.checklistItemId) {
      throw new Error("Checklist item missing on document");
    }

    await tx
      .update(checklistItemsTable)
      .set({ status: ChecklistStatus.RECEIVED })
      .where(eq(checklistItemsTable.id, createdDocument.checklistItemId));

    const [{ total }] = await tx
      .select({ total: count() })
      .from(checklistItemsTable)
      .where(eq(checklistItemsTable.requestId, requestId));

    const [{ received }] = await tx
      .select({ received: count() })
      .from(checklistItemsTable)
      .where(
        and(
          eq(checklistItemsTable.requestId, requestId),
          eq(checklistItemsTable.status, ChecklistStatus.RECEIVED),
        ),
      );

    const newStatus =
      total > 0 && total === received
        ? RequestStatus.COMPLETED
        : received > 0
          ? RequestStatus.IN_PROGRESS
          : RequestStatus.PENDING;

    await tx
      .update(requestsTable)
      .set({ status: newStatus })
      .where(eq(requestsTable.id, requestId));

    return createdDocument;
  });
}

export async function updateDocumentById(
  requestId: string,
  documentId: string,
  document: Partial<DocumentInsert>,
) {
  return db.transaction(async (tx) => {
    const [updatedDocument] = await tx
      .update(documentsTable)
      .set(document)
      .where(eq(documentsTable.id, documentId))
      .returning();

    if (!updatedDocument) {
      throw new Error("Document not found");
    }

    if (!updatedDocument.checklistItemId) {
      throw new Error("Checklist item missing on document");
    }

    await tx
      .update(checklistItemsTable)
      .set({ status: ChecklistStatus.RECEIVED })
      .where(eq(checklistItemsTable.id, updatedDocument.checklistItemId));

    const [{ total }] = await tx
      .select({ total: count() })
      .from(checklistItemsTable)
      .where(eq(checklistItemsTable.requestId, requestId));

    const [{ received }] = await tx
      .select({ received: count() })
      .from(checklistItemsTable)
      .where(
        and(
          eq(checklistItemsTable.requestId, requestId),
          eq(checklistItemsTable.status, ChecklistStatus.RECEIVED),
        ),
      );

    const newStatus =
      total > 0 && total === received
        ? RequestStatus.COMPLETED
        : received > 0
          ? RequestStatus.IN_PROGRESS
          : RequestStatus.PENDING;

    await tx
      .update(requestsTable)
      .set({ status: newStatus })
      .where(eq(requestsTable.id, requestId));

    return updatedDocument;
  });
}

export async function getDocumentsByChecklistIds(checklistItemIds: string[]) {
  return db
    .select()
    .from(documentsTable)
    .where(inArray(documentsTable.checklistItemId, checklistItemIds));
}
