import { AuthenticatedRequest } from "@models/express";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "@repositories/templates.repository";

export const createTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.user;
  const templateRequest = request.body;

  const template = await createTemplate({
    ...templateRequest,
    userId: authUser?.userId,
  });
  return template;
};

export const getTemplatesHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.user;
  const templates = await getTemplates(authUser?.userId);
  return templates;
};

export const getTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.user;
  const template = await getTemplateById(
    authUser?.userId,
    request.params.templateId
  );
  return template;
};

export const updateTemplateHandler = async (request: AuthenticatedRequest) => {
  const templateRequest = request.body;

  const template = await updateTemplate(templateRequest);
  return template;
};

export const deleteTemplateHandler = async (request: AuthenticatedRequest) => {
  const authUser = request.user;
  const templateId = request.params.templateId;

  return await deleteTemplate(authUser?.userId, templateId);
};
