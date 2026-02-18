import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

import styles from "./empty-state.module.css";

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;

  primaryActionLabel?: string;
  onPrimaryAction?: () => void;

  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;

  size?: "sm" | "md" | "lg";
};

export function EmptyState({
  icon,
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  size = "md",
}: Props) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}
      </div>

      {(primaryActionLabel || secondaryActionLabel) && (
        <div className={styles.actions}>
          {secondaryActionLabel && (
            <Button intent="secondary" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}

          {primaryActionLabel && (
            <Button intent="primary" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
