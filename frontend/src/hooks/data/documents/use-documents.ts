import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { documentRequestsApi } from "@/services/document-requests.service";
import { documentsApi } from "@/services/documents.service";
import { DocumentsUploadChecklist } from "@/types/models/document";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export const useUploadDocument = (requestToken?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      checklistItemId,
      requestId,
      documentId,
    }: {
      file: File;
      checklistItemId: string;
      requestId: string;
      documentId?: string;
    }) =>
      documentsApi.uploadDocument(file, checklistItemId, requestId, documentId),

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

export function useGetUploadChecklistItems(requestToken?: string | null) {
  return useQuery({
    queryKey: ["uploadChecklistItems", requestToken],
    queryFn: () => documentRequestsApi.getUploadChecklistItems(requestToken!),
    enabled: !!requestToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
