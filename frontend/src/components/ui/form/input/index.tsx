"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
  messageType = "",
  messagePosition = "left",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  const hasError = message && messageType === "error";

  const inputClasses = [
    "input",
    isPassword && "input-with-icon",
    hasError && "input-error",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const messageClasses = [
    "form-message",
    `form-message-${messageType}`,
    `form-message-${messagePosition}`,
  ].join(" ");

  return (
    <div className={["form-control", containerClassName].join(" ")}>
      {label && (
        <label
          className={["form-label", labelClassName].join(" ")}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className={["form-field", fieldClassName].join(" ")}>
        <input
          id={id}
          type={resolvedType}
          className={inputClasses}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="input-icon-btn"
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
