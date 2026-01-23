import { db } from "@database/drizzle";
import {
  ChecklistItemInsert,
  checklistItemsTable,
} from "@database/schema/checklist-items.schema";

export async function createCheckListItems(
  checklistItems: ChecklistItemInsert[]
): Promise<void> {
  await db.insert(checklistItemsTable).values(checklistItems);
}
