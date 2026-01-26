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
  size?: number;
  tone?: IconTone;
  strokeWidth?: number;
  onClick?: () => void;
  className?: string;
  containerClassName?: string;
}

export const Icon = ({
  name: IconComponent,
  size = 18,
  tone = "inherit",
  strokeWidth = 2,
  onClick,
  className = "",
  containerClassName = "",
}: Props) => {
  return (
    <span
      onClick={onClick}
      className={[styles.container, containerClassName].join(" ")}
    >
      <IconComponent
        size={size}
        strokeWidth={strokeWidth}
        className={[styles.icon, tone !== "inherit" && styles[tone], className]
          .filter(Boolean)
          .join(" ")}
      />
    </span>
  );
};
