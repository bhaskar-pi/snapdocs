import React from "react";
import styles from "./button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "neutral" | "negative";
}

export const Button = ({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        disabled ? styles.disabled : "",
        className,
      ].join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
