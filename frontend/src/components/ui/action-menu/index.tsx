"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

import styles from "./action-menu.module.css";

interface Props {
  trigger: ReactNode;
  context: ReactNode;
}

export function ActionMenu({ context, trigger }: Props) {
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
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className={styles.menu} role="menu">
          {context}
        </div>
      )}
    </div>
  );
}
