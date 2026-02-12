import { FileText } from "lucide-react";

import styles from "./logo.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  description?: string;
}

export const Logo = ({ size = "lg", showText = true, description }: Props) => {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <div className={styles.iconWrapper}>
        <FileText
          size={{ sm: 18, md: 20, lg: 24 }[size]}
          strokeWidth={2}
          className={styles.icon}
        />
      </div>

      {showText && (
        <div className={styles.textContainer}>
          <span className={`${styles.text} ${styles.textBrand}`}>SnapDocs</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
