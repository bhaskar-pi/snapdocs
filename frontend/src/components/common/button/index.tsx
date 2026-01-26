import React from "react";

import styles from "./button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "neutral" | "negative" | "negativeL" | 'info';
  width?: string;

  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  variant = "primary",
  width,
  className = "",
  disabled,
  children,
  icon,
  iconPosition = "left",
  ...props
}: Props) => {
  const isIconOnly = !!icon && !children;

  return (
    <button
      type="button"
      style={width ? { width } : undefined}
      disabled={disabled}
      className={[
        styles.button,
        styles[variant],
        isIconOnly ? styles.iconOnly : "",
        disabled ? styles.disabled : "",
        className,
      ].join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={styles.icon}>{icon}</span>
      )}

      {children && <span className={styles.label}>{children}</span>}

      {icon && iconPosition === "right" && (
        <span className={[styles.icon].join(" ")}>{icon}</span>
      )}
    </button>
  );
};
