"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

import styles from "./action-menu.module.css";

interface Props {
  children: ReactNode;
}

export function ActionMenu({ children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        •••
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          {children}
        </div>
      )}
    </div>
  );
}
