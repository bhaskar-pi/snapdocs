import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { templatesApi } from "@/services/templates.service";
import { ApiError, ApiResponse } from "@/types/models/misc";
import { Template } from "@/types/models/templates";
import { getErrorMessage } from "@/utils/api";

export function useTemplates(userId: string) {
  return useQuery<ApiResponse<Template[]>>({
    queryKey: ["templates", userId],
    queryFn: () => templatesApi.getTemplates(),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useTemplateById(userId: string, templateId: string) {
  return useQuery<ApiResponse<Template>>({
    queryKey: ["template", userId, templateId],
    queryFn: () => templatesApi.getTemplateById(templateId),
    enabled: !!userId && !!templateId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useUpdateTemplate(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Template) => templatesApi.updateTemplate(payload),

    onSuccess: (response) => {
      const updatedTemplate = response.data;

      queryClient.setQueryData(
        ["template", userId, updatedTemplate.id],
        updatedTemplate,
      );

      queryClient.setQueryData<ApiResponse<Template[]>>(
        ["templates", userId],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((t) =>
              t.id === updatedTemplate.id ? updatedTemplate : t,
            ),
          };
        },
      );

      toast.success("Template updated successfully.");
    },

    onError: (error) => {
      const msg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(msg || "Failed to update template.");
    },
  });
}

export function useCreateTemplate(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Template>) =>
      templatesApi.createTemplate(payload),

    onSuccess: (response) => {
      const createdTemplate = response.data;

      queryClient.setQueryData<ApiResponse<Template[]>>(
        ["templates", userId],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: [createdTemplate, ...old.data],
          };
        },
      );

      queryClient.setQueryData(
        ["template", userId, createdTemplate.id],
        createdTemplate,
      );

      toast.success("Template created successfully.");
    },

    onError: (error) => {
      const errorMsg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(errorMsg);
    },
  });
}

export function useDeleteTemplate(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => templatesApi.deleteTemplate(templateId),

    onSuccess: (_, templateId) => {
      queryClient.setQueryData<ApiResponse<Template[]>>(
        ["templates", userId],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((template) => template.id !== templateId),
          };
        },
      );

      queryClient.removeQueries({
        queryKey: ["template", userId, templateId],
      });

      toast.success("Template deleted successfully.");
    },

    onError: (error) => {
      const errorMsg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(errorMsg);
    },
  });
}
