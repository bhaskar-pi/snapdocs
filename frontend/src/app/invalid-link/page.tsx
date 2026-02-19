"use client";

import { ShieldAlert } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

import styles from "./invalid-link.module.css";

export default function InvalidUploadPage() {
  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.topHeader}>
        <div className={styles.headerContainer}>
          <Logo description="Secure Document Collection" />
        </div>
      </header>

      {/* Centered Content */}
      <main className={styles.body}>
        <div className={styles.container}>
          <div className={`card ${styles.card}`}>
            <div className={styles.content}>
              <Icon
                name={ShieldAlert}
                size={28}
                tone="warning"
                containerClassName={styles.icon}
              />

              <h1 className={styles.title}>Link expired or invalid</h1>

              <p className={styles.description}>
                This upload link is no longer valid. It may have expired or was
                already used.
              </p>

              <p className={styles.helper}>
                Please contact your advisor to request a new secure upload link.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
