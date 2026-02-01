import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { documentRequestsApi } from "@/services/document-requests.service";
import { ClientRequest } from "@/types/models/client";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientRequest) =>
      documentRequestsApi.sendDocumentsRequest(data),

    onSuccess(_, variables) {
      toast.success(
        `Request sent to ${variables.client.fullName} successfully.`,
      );

      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },

    onError(error) {
      const message = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(message);
    },
  });
}
