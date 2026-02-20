"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import styles from "./error.module.css";
import { TextArea } from "../ui/form/text-area";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorForm({ error, reset }: Props) {
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReport = async () => {
    // TODO: call API
    await new Promise((res) => setTimeout(res, 600));
    setSubmitted(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={20} />
          </div>

          <div>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.subtitle}>
              An unexpected error occurred. You can try again or send us a
              report.
            </p>
          </div>
        </div>

        <div className={styles.errorBox}>
          <span className={styles.errorLabel}>Error Details</span>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>

        {!submitted ? (
          <>
            <div className={styles.formSection}>
              <TextArea
                id="error-form"
                label="What were you doing when this happened?"
                placeholder="Optional: describe what happened..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.actions}>
              <button className={styles.secondaryBtn} onClick={() => reset()}>
                Try Again
              </button>

              <button className={styles.primaryBtn} onClick={handleReport}>
                Send Report
              </button>
            </div>
          </>
        ) : (
          <div className={styles.successBox}>
            Thank you. The issue has been reported.
          </div>
        )}
      </div>
    </div>
  );
}
