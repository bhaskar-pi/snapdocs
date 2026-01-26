import styles from "./icon-badge.module.css";

type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";
type IconVariant =
  | "neutral"
  | "neutralL"
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
  containerClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
}

export const IconBadge = ({
  icon: Icon,
  size = "md",
  variant = "neutral",
  containerClassName = "",
  iconClassName = "",
  disabled = false,
}: Props) => {
  return (
    <div
      className={`${styles.badge} ${styles[size]} ${styles[variant]} ${containerClassName} ${disabled ? styles.disabled : ""}`}
    >
      <Icon className={[styles.icon, iconClassName].join(" ")} />
    </div>
  );
};
