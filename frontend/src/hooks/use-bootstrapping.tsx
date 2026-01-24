"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useBootstrapping() {
  const { setUser, setSession, clearUser } = useAuthStore((store) => store);
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.refresh(),

    onSuccess: (data) => {
      setUser(data.user);
      setSession(data.session);
    },

    onError: () => {
      clearUser();
      router.replace("/login");
    },
  });
}
