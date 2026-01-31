import { db } from "@database/drizzle";
import {
  DocRequest,
  DocRequestInsert,
  requestsTable,
} from "@database/schema/documents-request.schema";

export async function createRequest(
  request: DocRequestInsert,
): Promise<DocRequest> {
  const [result] = await db
    .insert(requestsTable)
    .values({ ...request })
    .returning();

  return result;
}
