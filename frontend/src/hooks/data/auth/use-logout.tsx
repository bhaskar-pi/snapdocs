"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export function useLogout() {
  const { clearUser } = useAuthStore((store) => store);
  const router = useRouter();

  return useMutation<unknown, AxiosError<ApiError>, void>({
    mutationFn: () => authApi.logout(),

    onSuccess() {
      clearUser();
      router.push("/login");
      toast.success("Logged out successfully.");
    },

    onError(error) {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
