import styles from "./icon-badge.module.css";

type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";

type IconVariant = "primary" | "secondary" | "success" | "warning" | "negative";

interface Props {
  icon: React.ElementType;
  size?: IconSize;
  variant?: IconVariant;
  disabled?: boolean;
  containerClassName?: string;
  iconClassName?: string;
}

export const IconBadge = ({
  icon: Icon,
  size = "md",
  variant = "secondary",
  disabled = false,
  containerClassName,
  iconClassName,
}: Props) => {
  return (
    <span
      className={[
        styles.badge,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon
        className={[styles.icon, iconClassName].filter(Boolean).join(" ")}
      />
    </span>
  );
};
