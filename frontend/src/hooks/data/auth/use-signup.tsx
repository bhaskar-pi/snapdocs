import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/services/auth.service";
import { SignUpForm } from "@/types/models/auth";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export const useSignup = () => {
  const router = useRouter();

  return useMutation<unknown, AxiosError<ApiError>, SignUpForm>({
    mutationFn: (data) => authApi.signup(data),

    onSuccess: () => {
      toast.success("Account created successfully.");
      router.push("/login");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
