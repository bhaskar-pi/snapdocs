import { DELETE, GET, POST, PUT } from "@/api/http";
import { ApiResponse } from "@/types/models/misc";
import { Template } from "@/types/models/templates";

export const templatesApi = {
  getTemplates() {
    return GET<ApiResponse<Template[]>>("/templates");
  },

  getTemplateById(templateId: string) {
    return GET<ApiResponse<Template>>(`/templates/${templateId}`);
  },

  createTemplate(template: Partial<Template>) {
    return POST<ApiResponse<Template>>(`/templates`, template);
  },

  updateTemplate(template: Template) {
    return PUT<ApiResponse<Template>>(`/templates/${template.id}`, template);
  },

  deleteTemplate(templateId: string) {
    return DELETE(`/templates/${templateId}`);
  },
};
