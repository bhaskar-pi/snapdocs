"use client";

import Link from "next/link";

import styles from "./marketing-header.module.css";
import { Logo } from "../logo";

export const MarketingHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Logo />

        {/* Right Actions */}
        <nav className={styles.nav}>
          <Link href="/login" className={styles.login}>
            Login
          </Link>

          <Link href="/signup" className={styles.primaryBtn}>
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};
