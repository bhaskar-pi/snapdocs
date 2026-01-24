"use client";

import { useEffect, useRef } from "react";

import { useBootstrapping } from "@/hooks/use-bootstrapping";
import { useAuthStore } from "@/store/auth.store";

export function AuthBootstrap() {
  const { persistedUser } = useAuthStore();
  const { mutate: bootstrap } = useBootstrapping();

  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (!persistedUser) return;
    if (hasBootstrapped.current) return;

    hasBootstrapped.current = true;
    bootstrap();
  }, [persistedUser, bootstrap]);

  return null;
}
