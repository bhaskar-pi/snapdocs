"use client";

import { useState } from "react";

import styles from "./error.module.css";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorForm({ error, reset }: Props) {
  const [description, setDescription] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={`card card-md ${styles.errorCard}`}>
        <div className={styles.header}>
          <h2 className="title">Something went wrong</h2>
          <span></span>
          <p className="description">
            An unexpected error occurred. You can retry or report the issue.
          </p>
        </div>

        <div className={styles.errorBox}>
          <span className={styles.errorLabel}>Error Details</span>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>

        <div className="base-form">
          <textarea
            className={styles.textarea}
            placeholder="What were you doing when this happened? (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={() => reset()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
