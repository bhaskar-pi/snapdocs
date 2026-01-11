import { db } from "@database/drizzle";
import { DocRequest, requestsTable } from "@database/schema/doc-request.schema";

export async function createRequest(request: DocRequest) {
  await db.insert(requestsTable).values({ ...request });
}
