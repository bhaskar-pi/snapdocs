"use client";

import { useId } from "react";

import styles from "./toggle.module.css";

interface Props {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;

  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Toggle = ({
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
}: Props) => {
  const id = useId();

  const isControlled = checked !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
    >
      {(label || description) && (
        <div className={styles.text}>
          {label && <span className={styles.label}>{label}</span>}
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      )}

      <div className={styles.switchWrapper}>
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
        />

        <span className={styles.switch} />
      </div>
    </label>
  );
};
