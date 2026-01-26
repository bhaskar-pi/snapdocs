import styles from "./loader.module.css";
type Props = {
  open: boolean;
  text?: string;
};

export function Loader({ open, text = "Loading..." }: Props) {
  if (!open) return null;

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingBackdrop} />

      <div className={styles.loadingModal}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>{text}</p>
      </div>
    </div>
  );
}
