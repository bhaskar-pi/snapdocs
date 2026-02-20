import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { documentRequestsApi } from "@/services/document-requests.service";
import { documentsApi } from "@/services/documents.service";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export const useUploadDocument = (requestToken?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      checklistItemId,

      documentId,
    }: {
      file: File;
      checklistItemId: string;

      documentId?: string;
    }) =>
      documentsApi.uploadDocument(
        file,
        checklistItemId,
        documentId,
        requestToken,
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["uploadChecklistItems", requestToken],
      });

      toast.success("Document uploaded successfully.");
    },

    onError(error) {
      const errorMsg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(errorMsg ?? "Document failed to upload.");
    },
  });
};

export function useGetDocumentUrl() {
  return useMutation({
    mutationFn: (documentId: string) => documentsApi.getDocumentUrl(documentId),
  });
}

export function useGetUploadChecklistItems(
  token?: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["upload-checklist", token],
    queryFn: () => documentRequestsApi.getUploadChecklistItems(token!),
    enabled: options?.enabled ?? true,
    retry: false,
  });
}
