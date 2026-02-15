import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const clientsTable = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    whatsappNumber: text("whatsapp_number"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("clients_user_email_unique").on(table.userId, table.email),
  ],
);

export type Client = InferSelectModel<typeof clientsTable>;
export type ClientInsert = InferInsertModel<typeof clientsTable>;
