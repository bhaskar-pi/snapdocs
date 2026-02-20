import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

const industryTypePgEnum = pgEnum("industry_type", [
  "CA_FIRM",
  "ACCOUNTING_TAX",
  "LAW_FIRM",
  "CONSULTING_FIRM",
  "FINANCIAL_ADVISORY",
  "OTHER",
]);

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number"),
    businessName: text("business_name").notNull(),
    businessType: industryTypePgEnum("business_type").notNull(),
    otherBusinessType: text("other_business_type"),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
);

export type User = InferSelectModel<typeof usersTable>;
export type UserInsert = InferInsertModel<typeof usersTable>;

export { industryTypePgEnum };
