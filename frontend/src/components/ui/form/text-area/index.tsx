"use client";

import React from "react";

import styles from "../form.module.css";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;

  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  textareaClassName?: string;

  message?: string;
  messageType?: "error" | "warning" | "info" | "success" | "secondary";
  messagePosition?: "left" | "right" | "center";
}

export const TextArea = ({
  id,
  label,
  containerClassName = "",
  labelClassName = "",
  fieldClassName = "",
  textareaClassName = "",
  message,
  messageType,
  messagePosition = "left",
  ...props
}: TextAreaProps) => {
  const hasError = message && messageType === "error";

  const textareaClasses = [
    styles.textarea,
    hasError && styles["input-error"],
    textareaClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const messageClasses = [
    styles["form-message"],
    message && messageType && styles[`form-message-${messageType}`],
    styles[`form-message-${messagePosition}`],
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
          htmlFor={id}
          className={[styles["form-label"], labelClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>
      )}

      <div
        className={[styles["form-field"], fieldClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <textarea id={id} className={textareaClasses} {...props} />
      </div>

      {message && <p className={messageClasses}>{message}</p>}
    </div>
  );
};
