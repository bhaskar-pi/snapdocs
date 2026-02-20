"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FeedbackForm } from "@/components/feedback-form";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./marketing-header.module.css";
import { Button } from "../button";
import { Logo } from "../logo";

export const MarketingHeader = () => {
  const router = useRouter();

  const [showSupportModal, setShowSupportModal] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Logo />

        {/* Right Actions */}
        <nav className={styles.nav}>
          <Button
            onClick={() => setShowSupportModal(true)}
            size="sm"
            variant="outline"
            aria-label="Open support form"
          >
            Support
          </Button>

          <Button size="sm" onClick={() => router.push(SCREEN_PATHS.LOGIN)}>
            Login
          </Button>

          <Button size="sm" onClick={() => router.push(SCREEN_PATHS.SIGNUP)}>
            Get Started
          </Button>
        </nav>
      </div>

      <FeedbackForm
        open={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        type="support"
      />
    </header>
  );
};
