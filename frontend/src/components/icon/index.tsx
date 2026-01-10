import React from "react";

import styles from "./icon.module.css";

type Size = "sm" | "md" | "lg";
type Tone =
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "info"
  | "warning"
  | "error";

interface Props {
  icon: React.ElementType;
  size?: Size;
  tone?: Tone;
  strokeWidth?: number;
  className?: string;
}

const DEFAULT_STROKE_WIDTH: Record<Size, number> = {
  sm: 2,
  md: 2.2,
  lg: 2.6,
};

export const Icon = ({
  icon: IconComponent,
  size = "md",
  tone = "primary",
  className = "",
  strokeWidth,
}: Props) => {
  return (
    <IconComponent
      strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH[size]}
      className={[styles.icon, styles[size], styles[tone], className].join(" ")}
    />
  );
};
