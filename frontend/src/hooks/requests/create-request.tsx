import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createRequestApi } from "@/services/create-request.service";
import { ClientRequest } from "@/types/models/client";
import { getErrorMessage } from "@/utils/api";

export function useCreateRequest() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ClientRequest) => createRequestApi.sendRequest(data),

    onSuccess() {
      router.push("/client-requests");
    },

    onError(error) {
      const message = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(message);
    },
  });
}
