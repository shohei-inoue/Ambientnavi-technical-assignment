type InputProps = {
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  minLength,
  maxLength,
  pattern,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      className="border border-gray-300 rounded-md p-2 w-full"
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
    />
  );
};

export default Input;
