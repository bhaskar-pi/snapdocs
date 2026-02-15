"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export function useLogin() {
  const { setUser, setSession } = useAuthStore((store) => store);
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),

    onSuccess(response) {
      setUser(response.data.user);
      setSession(response.data.session);

      router.push("/dashboard");
      toast.success(response.message);
    },

    onError(error: AxiosError<ApiError>) {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
