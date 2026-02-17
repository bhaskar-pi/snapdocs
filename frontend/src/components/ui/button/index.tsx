import React from "react";

type ButtonIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "negative";

type ButtonVariant = "solid" | "outline" | "ghost" | "soft";
type ButtonSize = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  block?: boolean;
}

export const Button = ({
  intent = "primary",
  variant = "soft",
  size = "md",
  loading = false,
  disabled,
  icon,
  iconPosition = "left",
  block = false,
  children,
  className = "",
  ...props
}: Props) => {
  const isIconOnly = !!icon && !children;
  const isDisabled = disabled || loading;

  const classes = [
    "btn",
    `btn-${intent}`,
    variant !== "solid" && `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    isIconOnly && "btn-icon",
    loading && "btn-loading",
    block && "btn-block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" disabled={isDisabled} className={classes} {...props}>
      {!loading && icon && iconPosition === "left" && (
        <span className="btn-icon-slot">{icon}</span>
      )}

      {children && <span className="btn-label">{children}</span>}

      {!loading && icon && iconPosition === "right" && (
        <span className="btn-icon-slot">{icon}</span>
      )}
    </button>
  );
};
