"use client";

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

  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  inputClassName?: string;

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

export const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",

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
  const [search, setSearch] = useState("");

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  // close dropdown on outside click
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
        <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>
          {label}
        </label>
      )}

      <div
        ref={wrapperRef}
        className={`${styles.selectWrapper} ${fieldClassName}`}
      >
        <input
          id={id}
          className={`${styles.input} ${inputClassName} ${errorBorder}`}
          placeholder={placeholder}
          value={open ? search : selectedOption?.label || ""}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
        />

        {open && (
          <div
            data-type={filteredOptions.length === 0 ? 'noResults' : ''}
            className={styles.selectDropdown}
          >
            {filteredOptions.length === 0 && (
              <div className={styles.selectEmpty}>No results found</div>
            )}

            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={styles.selectOption}
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

      {message && <p className={messageClassName}>{message}</p>}
    </div>
  );
};
