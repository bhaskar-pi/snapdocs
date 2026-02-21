"use client";

import { useEffect } from "react";

import { useBootstrapping } from "@/hooks/data/use-bootstrapping";
import { useAuthStore } from "@/store/auth.store";

export function AuthBootstrap() {
  const { hasBootstrapped, setBootstrapped } = useAuthStore();
  const { mutate: bootstrap } = useBootstrapping();

  useEffect(() => {
    if (hasBootstrapped) return;

    setBootstrapped(true);
    bootstrap();
  }, [hasBootstrapped, bootstrap, setBootstrapped]);

  return null;
}
