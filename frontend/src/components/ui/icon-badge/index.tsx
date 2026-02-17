import styles from "./icon-badge.module.css";

type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";
type IconVariant = "primary" | "secondary" | "success" | "warning" | "negative";

type IconMode = "solid" | "soft";

interface Props {
  icon: React.ElementType;
  size?: IconSize;
  variant?: IconVariant;
  mode?: IconMode;
  disabled?: boolean;
  containerClassName?: string;
  iconClassName?: string;
}

export const IconBadge = ({
  icon: Icon,
  size = "md",
  variant = "primary",
  mode = "solid",
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
        styles[`mode-${mode}`], // ✅
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
