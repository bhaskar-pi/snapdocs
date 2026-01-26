import React from "react";

import styles from "./icon.module.css";

type Tone =
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "white";

interface Props {
  name: React.ElementType;
  onClick?: () => void;
  size?: number;
  tone?: Tone;
  strokeWidth?: number;
  className?: string;
  containerClassName?: string;
}

export const Icon = ({
  name: Icon,
  onClick,
  size = 18,
  tone = "primary",
  className = "",
  containerClassName = "",
  strokeWidth,
}: Props) => {
  return (
    <div onClick={onClick} className={`${styles.container} ${containerClassName}`}>
      <Icon
        strokeWidth={strokeWidth}
        size={size}
        className={[styles.icon, styles[tone], className].join(" ")}
      />
    </div>
  );
};
