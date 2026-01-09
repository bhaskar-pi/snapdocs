import styles from "./icon-badge.module.css";

type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";
type IconVariant =
  | "neutral"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "light";

interface Props {
  icon: React.ElementType;
  size?: IconSize;
  variant?: IconVariant;
}

export const IconBadge = ({
  icon: Icon,
  size = "md",
  variant = "neutral",
}: Props) => {
  return (
    <div className={`${styles.badge} ${styles[size]} ${styles[variant]}`}>
      <Icon className={styles.icon} />
    </div>
  );
};
