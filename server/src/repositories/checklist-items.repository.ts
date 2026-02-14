import { db } from "@database/drizzle";
import {
  ChecklistItem,
  ChecklistItemInsert,
  checklistItemsTable,
} from "@database/schema/checklist-items.schema";
import { eq } from "drizzle-orm";

export async function createCheckListItems(
  checklistItems: ChecklistItemInsert[],
): Promise<void> {
  await db.insert(checklistItemsTable).values(checklistItems);
}

export async function getCheckListItemsByRequestId(
  requestId: string,
): Promise<ChecklistItem[] | undefined> {
  return db
    .select()
    .from(checklistItemsTable)
    .where(eq(checklistItemsTable.requestId, requestId));
}
