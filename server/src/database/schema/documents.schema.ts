import { index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { checklistItemsTable } from "./checklist-items.schema";

export const documentsTable = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    checklistItemId: uuid("checklist_item_id")
      .notNull()
      .references(() => checklistItemsTable.id, { onDelete: "cascade" }),

    fileName: text("file_name").notNull(),
    fileSize: integer("file_size").notNull(),
    storagePath: text("storage_path").notNull(),

    uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  },
  (table) => [
    index("documents_checklist_item_id_idx").on(table.checklistItemId),
  ]
);

export type Document = InferSelectModel<typeof documentsTable>;
export type DocumentInsert = InferInsertModel<typeof documentsTable>;
