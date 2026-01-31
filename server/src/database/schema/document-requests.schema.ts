import {
  pgTable,
  uuid,
  text,
  pgEnum,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { clientsTable } from "./clients.schema";
import { usersTable } from "./users.schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const requestStatusEnum = pgEnum("request_status", [
  "draft",
  "pending",
  "in_progress",
  "completed",
  "expired",
  "cancelled",
]);

export const requestsTable = pgTable(
  "requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => clientsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: requestStatusEnum("status").notNull().default("pending"),
    dueDate: timestamp("due_date"),
    sentAt: timestamp("sent_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("requests_client_id_user_id_idx").on(table.clientId, table.userId),
    index("requests_status_idx").on(table.status),
  ],
);

export type DocRequest = InferSelectModel<typeof requestsTable>;
export type DocRequestInsert = InferInsertModel<typeof requestsTable>;
