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
  messageType?: "error" | "warning" | "info" | "neutral";
  messagePosition?: "left" | "right" | "center";
}

const messagePositionStyles: Record<
  NonNullable<Props["messagePosition"]>,
  string
> = {
  left: styles.messageLeft,
  center: styles.messageCenter,
  right: styles.messageRight,
};

export const SearchInput: React.FC<Props> = ({
  id,
  label,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  fieldClassName = "",
  message,
  messageType = "error",
  messagePosition = "left",
  ...props
}) => {
  const messageClassName = [
    styles.message,
    styles[messageType],
    messagePositionStyles[messagePosition],
  ].join(" ");

  const errorBorder =
    message && messageType === "error" ? styles.inputError : "";

  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName}`} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`${styles.field} ${fieldClassName}`}>
        <div className={styles.searchWrapper}>
          <Icon className={styles.searchIcon} name={Search} />

          <input
            id={id}
            type="search"
            className={`${styles.input} ${styles.searchInput} ${inputClassName} ${errorBorder}`}
            {...props}
          />
        </div>

        {message && <p className={messageClassName}>{message}</p>}
      </div>
    </div>
  );
};
