import styles from "../form.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  fieldClassName?: string;
  message?: string;
  messageType?: "error" | "warning" | "info" | "neutral";
  messagePosition?: "left" | "right" | "center";
}

const messagePositionStyles: Record<
  NonNullable<InputProps["messagePosition"]>,
  string
> = {
  left: styles.messageLeft,
  center: styles.messageCenter,
  right: styles.messageRight,
};

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  fieldClassName = "",
  message,
  messageType = "error",
  messagePosition = "left",
  ...props
}) => {
  const messageClassName = [
    styles.message,
    styles[messageType],
    messagePositionStyles[messagePosition],
  ].join(" ");

  const errorBorder =
    message && messageType === "error" ? styles.inputError : "";

  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      <label className={`${styles.label} ${labelClassName}`} htmlFor={id}>
        {label}
      </label>

      <div className={`${styles.field} ${fieldClassName}`}>
        <input
          className={`${styles.input} ${inputClassName} ${errorBorder}`}
          type={type}
          id={id}
          {...props}
        />
        {message && <p className={messageClassName}>{message}</p>}
      </div>
    </div>
  );
};
