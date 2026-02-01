import styles from "./loader.module.css";
type Props = {
  open: boolean;
  text?: string;
};

export function ContentLoader({ open, text = "Loading..." }: Props) {
  if (!open) return null;

  return (
    <div className={styles.onlyLoader}>
      <div className={styles.loadingSpinner} />
      <p className={styles.loadingText}>{text}</p>
    </div>
  );
}
