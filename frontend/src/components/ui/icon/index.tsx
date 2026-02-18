import React from "react";

import styles from "./icon.module.css";

type IconTone =
  | "inherit"
  | "default"
  | "muted"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "negative"
  | "inverted";

interface Props {
  name: React.ElementType;
  text?: string;
  size?: number;
  tone?: IconTone;
  strokeWidth?: number;
  onClick?: () => void;
  className?: string;
  containerClassName?: string;
}

export const Icon = ({
  name: IconComponent,
  text,
  size = 18,
  tone = "inherit",
  strokeWidth = 2,
  onClick,
  className = "",
  containerClassName = "",
}: Props) => {
  const toneClass = tone !== "inherit" ? styles[tone] : "";

  return (
    <span
      onClick={onClick}
      className={[styles.container, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <IconComponent
        size={size}
        strokeWidth={strokeWidth}
        className={[styles.icon, toneClass, className]
          .filter(Boolean)
          .join(" ")}
      />

      {text && (
        <span className={[styles.text, toneClass].filter(Boolean).join(" ")}>
          {text}
        </span>
      )}
    </span>
  );
};
