import styles from "./loader.module.css";
type Props = {
  open: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
};

export function Loader({ open, text = "Loading...", size = "md" }: Props) {
  if (!open) return null;

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingBackdrop} />

      <div className={`${styles.loadingModal} ${styles[size]}`}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>{text}</p>
      </div>
    </div>
  );
}
