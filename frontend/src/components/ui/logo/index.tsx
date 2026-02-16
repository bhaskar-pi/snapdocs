import { CloudUpload } from "lucide-react";

import styles from "./logo.module.css";

interface Props {
  size?: "sm" | "md" | "lg" | "xxl" | "xxxl";
  showText?: boolean;
  showIcon?: boolean;
  description?: string;
}

export const Logo = ({
  size = "lg",
  showText = true,
  description,
  showIcon = true,
}: Props) => {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      {showIcon && (
        <div className={styles.iconWrapper}>
          <CloudUpload
            size={{ sm: 16, md: 18, lg: 22, xxl: 26, xxxl: 30 }[size]}
            strokeWidth={2}
            className={styles.icon}
          />
        </div>
      )}

      {showText && (
        <div className={styles.textContainer}>
          <span
            className={`${styles.text} ${styles.textBrand} ${styles[size]}`}
          >
            SnapDocs
          </span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
