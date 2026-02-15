import { AuthenticatedRequest } from "@models/express";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "@repositories/templates.repository";

export const createTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.authUser;
  const templateRequest = request.body;

  const template = await createTemplate({
    ...templateRequest,
    userId: authUser?.id,
  });
  return template;
};

export const getTemplatesHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.authUser;

  const templates = await getTemplates(authUser?.id!);
  return templates;
};

export const getTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.authUser;

  const template = await getTemplateById(
    authUser?.id!,
    request.params.templateId,
  );
  return template;
};

export const updateTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.authUser;
  const templateRequest = request.body;

  const template = await updateTemplate({
    ...templateRequest,
    userId: authUser?.id,
  });
  return template;
};

export const deleteTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.authUser;

  const templateId = request.params.templateId;
  return await deleteTemplate(authUser?.id!, templateId);
};
