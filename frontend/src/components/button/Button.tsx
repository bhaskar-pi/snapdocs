import styles from "./button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "neutral" | "negative";
  width?: string;
}

export const Button = ({
  variant = "primary",
  width = "",
  className = "",
  disabled,
  children,
  ...props
}: Props) => {
  return (
    <button
      style={width ? { width } : undefined}
      className={[
        styles.button,
        styles[variant],
        disabled ? styles.disabled : "",
        className,
      ].join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
