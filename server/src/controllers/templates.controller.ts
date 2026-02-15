import { Template, TemplateInsert } from "@database/schema/templates.schema";
import { AuthenticatedUser } from "@models/user";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "@repositories/templates.repository";
import { AppError } from "@utils/error";

export const createTemplateHandler = async ({
  authUser,
  request,
}: {
  authUser: AuthenticatedUser;
  request: TemplateInsert;
}) => {
  const template = await createTemplate({
    ...request,
    userId: authUser?.id,
  });

  return {
    message: "Template created successfully.",
    statusCode: 201,
    data: template,
  };
};

export const getTemplatesHandler = async ({
  authUser,
}: {
  authUser: AuthenticatedUser;
}) => {
  const templates = await getTemplates(authUser.id);

  return {
    message: "Templates retrieved successfully.",
    statusCode: 200,
    data: templates,
  };
};

export const getTemplateHandler = async ({
  authUser,
  params,
}: {
  authUser: AuthenticatedUser;
  params: { templateId: string };
}) => {
  if (!params.templateId) {
    throw new AppError("TemplateId not found", 400);
  }

  const template = await getTemplateById(authUser.id, params.templateId);
  return {
    message: "Template retrieved successfully.",
    statusCode: 200,
    data: template,
  };
};

export const updateTemplateHandler = async ({
  authUser,
  request,
}: {
  authUser: AuthenticatedUser;
  request: Template;
}) => {
  const template = await updateTemplate({
    ...request,
    userId: authUser?.id,
  });

  return {
    message: "Template updated successfully.",
    statusCode: 200,
    data: template,
  };
};

export const deleteTemplateHandler = async ({
  authUser,
  params,
}: {
  authUser: AuthenticatedUser;
  params: { templateId: string };
}) => {
  if (!params.templateId) {
    throw new AppError("TemplateId not found.", 400);
  }

  await deleteTemplate(authUser.id, params.templateId);

  return {
    statusCode: 204,
    success: true,
    message: "Template deleted successfully.",
  };
};
