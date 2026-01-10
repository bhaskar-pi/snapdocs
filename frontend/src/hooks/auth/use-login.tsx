"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { LoginResponse } from "@/types/models/auth.model";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export function useLogin() {
  const { setUser, setSession } = useAuthStore((store) => store);
  const router = useRouter();

  return useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),

    onSuccess(data) {
      setUser(data.user);
      setSession(data.session);

      router.push("/dashboard");
    },

    onError(error) {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
