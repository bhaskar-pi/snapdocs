import styles from "./form.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      <label className={`${styles.label} ${labelClassName}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${inputClassName}`}
        type={type}
        id={id}
        {...props}
      />
    </div>
  );
};
