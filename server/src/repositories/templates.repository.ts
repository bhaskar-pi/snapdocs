import { db } from "@database/drizzle";
import {
  Template,
  TemplateInsert,
  templatesTable,
} from "@database/schema/templates.schema";
import { and, eq } from "drizzle-orm";

export async function createTemplate(template: TemplateInsert) {
  const [created] = await db
    .insert(templatesTable)
    .values(template)
    .returning();

  return created;
}

export async function getTemplates(userId: string): Promise<Template[]> {
  return db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.userId, userId));
}

export async function getTemplateById(
  userId: string,
  templateId: string
): Promise<Template> {
  const [template] = await db
    .select()
    .from(templatesTable)
    .where(
      and(eq(templatesTable.userId, userId), eq(templatesTable.id, templateId))
    );

  return template;
}

export async function updateTemplate(template: Template): Promise<Template> {
  const [updated] = await db
    .update(templatesTable)
    .set({
      ...template,
      createdAt: new Date(template.createdAt),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(templatesTable.userId, template.userId),
        eq(templatesTable.id, template.id)
      )
    )
    .returning();

  return updated;
}

export async function deleteTemplate(userId: string, templateId: string) {
  return db
    .delete(templatesTable)
    .where(
      and(eq(templatesTable.userId, userId), eq(templatesTable.id, templateId))
    );
}
