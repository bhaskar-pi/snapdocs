"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./dashboard.module.css";

export function QuickActionsCard() {
  const router = useRouter();

  return (
    <div className={`card ${styles.sectionCard}`}>
      <header className={styles.sectionHeader}>
        <p className={styles.sectionTitle}>Quick actions</p>
        <p className={styles.sectionSubtitle}>
          Common actions to get work done faster.
        </p>
      </header>

      <div className="d-flex flex-col gap-3">
        <Button
          size="md"
          onClick={() => router.push(SCREEN_PATHS.DOCUMENT_REQUESTS)}
        >
          Create document request
        </Button>

        <Button
      
          variant="soft"
          size="md"
          onClick={() => router.push(SCREEN_PATHS.TEMPLATES)}
        >
          Create template
        </Button>

        <Button
          intent="success"
          variant="soft"
          size="md"
          onClick={() => router.push("/feedback")}
        >
          Provide feedback
        </Button>
      </div>
    </div>
  );
}
