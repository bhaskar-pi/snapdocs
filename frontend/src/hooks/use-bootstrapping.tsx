"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { SCREEN_PATHS } from "@/types/enums/paths";

export function useBootstrapping() {
  const { setUser, setSession, clearUser, setLoading } = useAuthStore(
    (store) => store,
  );
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      setLoading(true);
      return authApi.refresh();
    },

    onSuccess: (data) => {
      setUser(data.user);
      setSession(data.session);
      setLoading(false);
    },

    onError: () => {
      clearUser();
      setLoading(false);
      router.replace(SCREEN_PATHS.LOGIN);
    },
  });
}
