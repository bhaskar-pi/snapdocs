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
          size={size === "sm" ? 18 : size === "md" ? 22 : 26}
          strokeWidth={2.6}
          className={styles.icon}
        />
      </div>

      {showText && (
        <span className={`${styles.text} ${styles.textBrand}`}>SnapDocs</span>
      )}
    </div>
  );
};
