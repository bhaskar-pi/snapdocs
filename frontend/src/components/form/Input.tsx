interface InputProps {
  id: string;
  label: string;
  type: string;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  containerClassName,
  labelClassName,
  inputClassName,
  ...props
}) => {
  return (
    <div className={containerClassName}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input className={inputClassName} type={type} id={id} {...props} />
    </div>
  );
};
