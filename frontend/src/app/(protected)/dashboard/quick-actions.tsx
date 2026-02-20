"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FeedbackForm } from "@/components/feedback-form";
import { Button } from "@/components/ui/button";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./dashboard.module.css";

export function QuickActionsCard() {
  const router = useRouter();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  return (
    <>
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
            intent="warning"
            size="md"
            onClick={() => setOpenFeedbackModal(true)}
          >
            Provide feedback
          </Button>
        </div>
      </div>

      {/** Modal */}
      <FeedbackForm
        open={openFeedbackModal}
        onClose={() => setOpenFeedbackModal(false)}
        type="feedback"
      />
    </>
  );
}
