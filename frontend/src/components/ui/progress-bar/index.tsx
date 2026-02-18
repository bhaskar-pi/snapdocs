import styles from "./progress-bar.module.css";

export type ProgressVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type ProgressTextType = "percentage" | "count" | "none";

interface Props {
  completed: number;
  total: number;
  variant?: ProgressVariant;
  textType?: ProgressTextType;
}

export const ProgressBar = ({
  completed,
  total,
  variant = "neutral",
  textType = "count",
}: Props) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {textType !== "none" && (
        <span className={styles.text}>
          {textType === "percentage"
            ? `${percent}% completed`
            : `${completed}/${total}`}
        </span>
      )}
    </div>
  );
};
