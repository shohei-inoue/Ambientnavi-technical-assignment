import { SetStateAction } from "react";

type MenuItemQuantityFieldProps = {
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
};

const MenuItemQuantityField: React.FC<MenuItemQuantityFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto px-4 mt-4">
      <button
        className="w-10 h-10 bg-gray-300 text-lg rounded cursor-pointer"
        onClick={() => setValue((e) => Math.max(1, e - 1))}
      >
        -
      </button>
      <span className="text-lg font-semibold">{value}</span>
      <button
        className="w-10 h-10 bg-gray-300 text-lg rounded cursor-pointer"
        onClick={() => setValue((e) => e + 1)}
      >
        +
      </button>
    </div>
  );
};

export default MenuItemQuantityField;