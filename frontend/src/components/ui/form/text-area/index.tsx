"use client";

import styles from "../form.module.css";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;

  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  textareaClassName?: string;

  message?: string;
  messageType?: "error" | "warning" | "info" | "neutral";
  messagePosition?: "left" | "right" | "center";
}

const messagePositionStyles = {
  left: styles.messageLeft,
  center: styles.messageCenter,
  right: styles.messageRight,
};

export const TextArea = ({
  id,
  label,
  containerClassName = "",
  labelClassName = "",
  fieldClassName = "",
  textareaClassName = "",

  message,
  messageType = "error",
  messagePosition = "left",

  ...props
}: TextAreaProps) => {
  const messageClassName = [
    styles.message,
    styles[messageType],
    messagePositionStyles[messagePosition],
  ].join(" ");

  const errorBorder =
    message && messageType === "error" ? styles.inputError : "";

  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>
        {label}
      </label>

      <div className={`${styles.field} ${fieldClassName}`}>
        <textarea
          id={id}
          className={`${styles.textarea} ${textareaClassName} ${errorBorder}`}
          {...props}
        />
      </div>

      {message && <p className={messageClassName}>{message}</p>}
    </div>
  );
};
