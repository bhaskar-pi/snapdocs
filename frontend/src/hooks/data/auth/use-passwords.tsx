import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { authApi } from "@/services/auth.service";
import { UpdatePassword } from "@/types/models/auth";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: (passwords: UpdatePassword) =>
      authApi.updatePassword(passwords),

    onSuccess() {
      toast.success("Password updated successfully.");
    },

    onError(error) {
      const errorMsg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(errorMsg ?? "Failed to update password. Please try again.");
    },
  });
};
