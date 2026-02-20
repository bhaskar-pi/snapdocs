import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const feedbackTable = pgTable("feedback", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id),
  userName: text("user_name"),
  userEmail: text("user_email").notNull(),
  type: text("type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type FeedbackInsert = InferInsertModel<typeof feedbackTable>;
export type Feedback = InferSelectModel<typeof feedbackTable>;
