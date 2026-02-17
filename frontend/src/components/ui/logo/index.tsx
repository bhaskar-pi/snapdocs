import { CloudUpload } from "lucide-react";

import styles from "./logo.module.css";

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  showText?: boolean;
  showIcon?: boolean;
  description?: string;
  variant?: "light" | "dark";
}

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 26,
  "2xl": 30,
};

export const Logo = ({
  size = "lg",
  showText = true,
  description,
  showIcon = true,
  variant = "light",
}: Props) => {
  const isDiamond = !showText;

  return (
    <div
      className={[
        styles.logo,
        styles[size],
        styles[variant],
        isDiamond && styles.diamond,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcon && (
        <div className={styles["icon-wrapper"]}>
          <CloudUpload
            size={iconSizes[size]}
            strokeWidth={2.5}
            className={styles.icon}
          />
        </div>
      )}

      {showText && (
        <div className={styles["text-container"]}>
          <span className={styles["text-brand"]}>SnapDocs</span>
          {description && (
            <span className={styles["text-description"]}>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
