import { DELETE, GET, POST, PUT } from "@/api/http";
import { Template } from "@/types/models/templates";

export const templatesApi = {
  getTemplates() {
    return GET<Template[]>("/templates");
  },

  getTemplateById(templateId: string) {
    return GET<Template>(`/templates/${templateId}`);
  },

  createTemplate(template: Partial<Template>) {
    return POST<Template>(`/templates`, template);
  },

  updateTemplate(template: Template) {
    return PUT<Template>(`/templates/${template.id}`, template);
  },

  deleteTemplate(templateId: string) {
    return DELETE(`/templates/${templateId}`);
  },
};
