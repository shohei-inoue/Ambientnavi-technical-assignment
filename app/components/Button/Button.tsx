type ButtonProps = {
  children: React.ReactNode;
  size?: "hug" | "full" | "fixed";
  color?: "primary" | "secondary" | "danger";
  variant?: "filled" | "outlined";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  size = "full",
  color = "primary",
  variant = "filled",
  type = "button",
  onClick,
}) => {
  const sizeStyles = {
    hug: "px-4 py-3",
    full: "w-full h-12",
    fixed: "w-[240px] h-12",
  };

  const colorStyles = {
    primary: "bg-gray-500 text-white",
    secondary: "bg-black text-white",
    danger: "bg-red-500 text-white",
  };

  const variantStyles = {
    filled: "bg-gray-500 text-white",
    outlined: "border border-gray-500 text-gray-500",
  };

  return (
    <button
      className={`${sizeStyles[size]} ${colorStyles[color]} ${variantStyles[variant]} cursor-pointer`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
