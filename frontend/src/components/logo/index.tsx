import { FolderOpen } from "lucide-react";

import styles from "./logo.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ size = "lg", showText = true }: Props) => {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <div className={styles.iconWrapper}>
        <FolderOpen
          size={{ sm: 18, md: 22, lg: 26 }[size]}
          strokeWidth={2}
          className={styles.icon}
        />
      </div>

      {showText && (
        <span className={`${styles.text} ${styles.textBrand}`}>SnapDocs</span>
      )}
    </div>
  );
};
