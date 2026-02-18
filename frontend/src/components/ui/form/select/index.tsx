"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "../form.module.css";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  id?: string;
  label?: string;
  options: Option[];

  value?: string;
  onChange?: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;

  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  inputClassName?: string;

  message?: string;
  messageType?: "error" | "warning" | "info" | "success" | "primary";
  messagePosition?: "left" | "right" | "center";
}

const messageTypeClasses = {
  error: styles["form-message-error"],
  warning: styles["form-message-warning"],
  info: styles["form-message-info"],
  success: styles["form-message-success"],
  primary: styles["form-message-primary"],
};

const messagePositionClasses = {
  left: styles["form-message-left"],
  center: styles["form-message-center"],
  right: styles["form-message-right"],
};

export const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  isLoading = false,

  containerClassName = "",
  labelClassName = "",
  fieldClassName = "",
  inputClassName = "",

  message,
  messageType = "error",
  messagePosition = "left",
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const calculateDirection = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const dropdownHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setOpenUp(true);
    } else {
      setOpenUp(false);
    }
  };

  const openDropdown = () => {
    calculateDirection();
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasError = message && messageType === "error";

  const inputClasses = [
    styles.input,
    hasError && styles["input-error"],
    isLoading && styles["input-with-loader"],
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
          htmlFor={id}
          className={[styles["form-label"], labelClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>
      )}

      <div
        ref={wrapperRef}
        className={[styles["select-wrapper"], fieldClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          id={id}
          className={inputClasses}
          placeholder={placeholder}
          value={open ? search : selectedOption?.label || ""}
          onFocus={openDropdown}
          onChange={(e) => {
            setSearch(e.target.value);
            openDropdown();
          }}
          disabled={disabled}
          autoComplete="off"
        />

        {!isLoading && (
          <span className={styles["input-icon-btn"]}>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        )}

        {isLoading && <span className={styles["input-loader"]} />}

        {open && (
          <div
            className={[
              styles["select-dropdown"],
              openUp && styles["select-dropdown-up"],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {filteredOptions.length === 0 && (
              <div className={styles["select-empty"]}>No results found</div>
            )}

            {filteredOptions.map((option) => (
              <div
                data-type={
                  selectedOption?.label === option.label ? "active" : ""
                }
                key={option.value}
                className={[
                  styles["select-option"],
                  selectedOption?.value === option.value &&
                    styles["select-option-active"],
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {message && <p className={messageClasses}>{message}</p>}
    </div>
  );
};
