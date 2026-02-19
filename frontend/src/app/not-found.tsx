"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SCREEN_PATHS } from "@/types/enums/paths";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>

      <h2 className="not-found-title">Page Not Found</h2>

      <p className="not-found-description">
        The page you are looking for does not exist or was moved.
      </p>

      <Button
        className="not-found-button"
        onClick={() => router.push(SCREEN_PATHS.LOGIN)}
      >
        Move Away
      </Button>
    </div>
  );
}
