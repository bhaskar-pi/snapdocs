"use client";

import styles from "./dashboard.module.css";

interface Props {
  title: string;
  value: string;
  helper: string;
  trend?: "up" | "down" | "flat";
}

export function MetricCard({ title, value, helper, trend }: Props) {
  return (
    <article className={`card ${styles.metricCard}`}>
      <p className={styles.metricTitle}>{title}</p>

      <div className={styles.metricHeader}>
        <p className={styles.metricValue}>{value}</p>

        {trend && (
          <span
            className={[
              styles.trendPill,
              trend === "up"
                ? styles.trendUp
                : trend === "down"
                  ? styles.trendDown
                  : styles.trendFlat,
            ].join(" ")}
          >
            {trend === "up"
              ? "Improving"
              : trend === "down"
                ? "Needs attention"
                : "Steady"}
          </span>
        )}
      </div>

      <p className={styles.metricHelper}>{helper}</p>
    </article>
  );
}
