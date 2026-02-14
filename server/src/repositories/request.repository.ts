import { db } from "@database/drizzle";
import {
  DocRequest,
  DocRequestInsert,
  requestsTable,
} from "@database/schema/document-requests.schema";
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
