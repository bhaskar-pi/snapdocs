import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { documentRequestsApi } from "@/services/document-requests.service";
import { ClientRequest } from "@/types/models/client";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export function useCreateRequest() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ClientRequest) =>
      documentRequestsApi.sendDocumentsRequest(data),

    onSuccess() {
      toast.success("Request sent to the client successfully");
      router.push("/client-requests");
    },

    onError(error) {
      const message = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(message);
    },
  });
}
