"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import styles from "../form.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  fieldClassName?: string;
  message?: string;
  messageType?: "error" | "warning" | "info" | "success" | "secondary";
  messagePosition?: "left" | "right" | "center";
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  fieldClassName = "",
  message,
  messageType = "error",
  messagePosition = "left",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  const hasError = message && messageType === "error";

  const messageTypeClasses = {
    error: styles["form-message-error"],
    warning: styles["form-message-warning"],
    info: styles["form-message-info"],
    success: styles["form-message-success"],
    secondary: styles["form-message-secondary"],
  };

  const messagePositionClasses = {
    left: styles["form-message-left"],
    center: styles["form-message-center"],
    right: styles["form-message-right"],
  };

  const inputClasses = [
    styles.input,
    isPassword && styles["input-with-icon"],
    hasError && styles["input-error"],
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const messageClasses = [
    styles["form-message"],
    message && messageTypeClasses[messageType],
    messagePositionClasses[messagePosition],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={[styles["form-control"], containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label
          className={[styles["form-label"], labelClassName]
            .filter(Boolean)
            .join(" ")}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className={[styles["form-field"], fieldClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          id={id}
          type={resolvedType}
          className={inputClasses}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={styles["input-icon-btn"]}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {message && <p className={messageClasses}>{message}</p>}
    </div>
  );
};
