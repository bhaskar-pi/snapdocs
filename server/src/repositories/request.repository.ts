import { db } from "@database/drizzle";
import { checklistItemsTable } from "@database/schema/checklist-items.schema";
import {
  Client,
  ClientInsert,
  clientsTable,
} from "@database/schema/clients.schema";
import {
  DocRequest,
  DocRequestInsert,
  requestsTable,
} from "@database/schema/document-requests.schema";
import { CreateRequestPayload } from "@models/payloads/documents-request.payload";
import { eq } from "drizzle-orm";

export async function createRequest(
  request: DocRequestInsert,
): Promise<DocRequest> {
  const [result] = await db
    .insert(requestsTable)
    .values({ ...request })
    .returning();

  return result;
}

export async function getDocumentRequestById(
  requestId: string,
): Promise<DocRequest | undefined> {
  const [result] = await db
    .select()
    .from(requestsTable)
    .where(eq(requestsTable.id, requestId))
    .limit(1);

  return result;
}

export async function createDocumentRequest(
  userId: string,
  client: ClientInsert,
  docRequest: CreateRequestPayload,
): Promise<{ clientRecord: Client; createdRequest: DocRequest }> {
  const { title, dueDate, description } = docRequest;

  return await db.transaction(async (tx) => {
    let [clientRecord] = await tx
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.email, client.email))
      .limit(1);

    if (!clientRecord) {
      const [createdClient] = await tx
        .insert(clientsTable)
        .values({
          ...client,
          userId,
        })
        .returning();

      clientRecord = createdClient;
    }

    // Create request
    const [createdRequest] = await tx
      .insert(requestsTable)
      .values({
        title: title ?? "",
        description,
        userId,
        clientId: clientRecord.id,
        sentAt: new Date(),
        ...(dueDate && { dueDate: new Date(dueDate) }),
      })
      .returning();

    // Prepare checklist rows
    const checklistRows = docRequest.documents.map((doc) => ({
      ...doc,
      requestId: createdRequest.id,
    }));

    await tx.insert(checklistItemsTable).values(checklistRows);

    return {
      clientRecord,
      createdRequest,
    };
  });
}
