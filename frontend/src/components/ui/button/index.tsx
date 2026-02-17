"use client";

import React from "react";

import styles from "./button.module.css";

type ButtonIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "negative";

type ButtonVariant = "solid" | "outline" | "ghost" | "soft";
type ButtonSize = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  block?: boolean;
}

export const Button = ({
  intent = "primary",
  variant = "solid",
  size = "md",
  loading = false,
  disabled,
  icon,
  iconPosition = "left",
  block = false,
  children,
  className = "",
  ...props
}: Props) => {
  const isIconOnly = !!icon && !children;
  const isDisabled = disabled || loading;

  const classes = [
    styles.btn,
    styles[`btn-${intent}`],
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    isIconOnly && styles["btn-icon"],
    loading && styles["btn-loading"],
    block && styles["btn-block"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} disabled={isDisabled} className={classes}>
      {!loading && icon && iconPosition === "left" && (
        <span className={styles["btn-icon-slot"]}>{icon}</span>
      )}

      {children && <span className={styles["btn-label"]}>{children}</span>}

      {!loading && icon && iconPosition === "right" && (
        <span className={styles["btn-icon-slot"]}>{icon}</span>
      )}
    </button>
  );
};
