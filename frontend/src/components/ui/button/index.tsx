import React from "react";

import styles from "./button.module.css";

type ButtonIntent =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "negative";

type ButtonVariant = "solid" | "outline" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  intent = "primary",
  variant = "solid",
  loading = false,
  disabled,
  icon,
  iconPosition = "left",
  children,
  className = "",
  ...props
}: Props) => {
  const isIconOnly = !!icon && !children;
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={[
        styles.button,
        styles[variant],
        styles[intent],
        isIconOnly && styles.iconOnly,
        loading && styles.loading,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && <span className={styles.spinner} />}

      {!loading && icon && iconPosition === "left" && (
        <span className={styles.icon}>{icon}</span>
      )}

      {children && <span className={styles.label}>{children}</span>}

      {!loading && icon && iconPosition === "right" && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
};
