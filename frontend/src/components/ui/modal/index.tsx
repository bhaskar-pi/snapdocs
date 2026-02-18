"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

import styles from "./modal.module.css";

interface ModalAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;

  title?: string;
  description?: string;

  onSave?: ModalAction;
  onDismiss?: ModalAction;
  onDelete?: ModalAction;

  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  title,
  description,
  onSave,
  onDismiss,
  onDelete,
  size = "medium",
  children,
}: ModalProps) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {(title || description) && (
          <div className={styles.header}>
            <div>
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </div>

            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {(onSave || onDismiss || onDelete) && (
          <div className={styles.footer}>
            <div className={styles.footerLeft}>
              {onDismiss && (
                <Button
                  intent="secondary"
                  onClick={onDismiss.onClick}
                  disabled={onDismiss.disabled}
                  variant="soft"
                  size="sm"
                >
                  {onDismiss.label}
                </Button>
              )}
            </div>

            <div className={styles.footerRight}>
              {onDelete && (
                <Button
                  loading={onDelete.isLoading}
                  intent="negative"
                  onClick={onDelete.onClick}
                  disabled={onDelete.disabled}
                  variant="soft"
                  size="sm"
                >
                  {onDelete.label}
                </Button>
              )}

              {onSave && (
                <Button
                  loading={onSave.isLoading}
                  intent="primary"
                  onClick={onSave.onClick}
                  disabled={onSave.disabled}
                  size="sm"
                >
                  {onSave.label}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
