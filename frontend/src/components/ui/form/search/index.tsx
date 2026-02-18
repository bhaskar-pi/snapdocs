"use client";

import { Search } from "lucide-react";
import React from "react";


import { Icon } from "../../icon";
import styles from "../form.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
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

export const SearchInput: React.FC<Props> = ({
  id,
  label,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  fieldClassName = "",
  message,
  messageType,
  messagePosition = "left",
  ...props
}) => {
  const hasError = message && messageType === "error";

  const inputClasses = [
    styles.input,
    styles["search-input"],
    hasError && styles["input-error"],
    inputClassName,
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
        <div className={styles["search-wrapper"]}>
          <Icon name={Search} size={16} className={styles["search-icon"]} />

          <input id={id} type="search" className={inputClasses} {...props} />
        </div>
      </div>

      {message && <p className={messageClasses}>{message}</p>}
    </div>
  );
};
