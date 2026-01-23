import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { requestsTable } from "./doc-request.schema";

export const checklistStatusEnum = pgEnum("checklist_status", [
  "pending",
  "received",
]);

export const checklistItemsTable = pgTable(
  "doc_checklist_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => requestsTable.id, { onDelete: "cascade" }),

    documentName: text("document_name").notNull(),
    status: checklistStatusEnum("status").notNull().default("pending"),
    isRequired: boolean("is_required").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("checklist_items_request_id_idx").on(table.requestId)]
);

export type ChecklistItem = InferSelectModel<typeof checklistItemsTable>;
export type ChecklistItemInsert = InferInsertModel<typeof checklistItemsTable>;
