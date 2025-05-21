"use client";

import { SetStateAction, useState } from "react";
import MenuDetailItem from "./MenuDetailItem";

type MenuDetailNameFieldProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
};

const MenuDetailNameFiled: React.FC<MenuDetailNameFieldProps> = ({
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <MenuDetailItem title="商品名">
      <input
        type="text"
        name="name"
        placeholder="商品名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 w-full rounded"
        onBlur={handleValidate}
        required
      />
      {isError && (
        <p className="text-sm text-red-500 mt-1">商品名を入力してください</p>
      )}
    </MenuDetailItem>
  );
};

export default MenuDetailNameFiled;
