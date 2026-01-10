import React from "react";

import styles from "./icon.module.css";

type Tone =
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "info"
  | "warning"
  | "error";

interface Props {
  name: React.ElementType;
  size?: number;
  tone?: Tone;
  strokeWidth?: number;
  className?: string;
}

export const Icon = ({
  name: Icon,
  size = 18,
  tone = "primary",
  className = "",
  strokeWidth,
}: Props) => {
  return (
    <Icon
      strokeWidth={strokeWidth}
      size={size}
      className={[styles.icon, styles[tone], className].join(" ")}
    />
  );
};
