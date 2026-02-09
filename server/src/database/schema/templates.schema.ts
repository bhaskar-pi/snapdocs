import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  index,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";

export const templatesTable = pgTable(
  "templates",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category"),
    documents: jsonb("documents")
      .$type<{ name: string; isRequired: boolean }[]>()
      .notNull()
      .default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("templates_user_id_idx").on(table.userId)]
);

export type Template = InferSelectModel<typeof templatesTable>;
export type TemplateInsert = InferInsertModel<typeof templatesTable>;
