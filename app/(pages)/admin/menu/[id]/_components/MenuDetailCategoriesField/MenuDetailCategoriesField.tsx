"use client";

import { Category } from "@/app/generated/prisma";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";
import { SetStateAction, useState } from "react";
import { AdminCategoriesData } from "@/app/types/types";

type MenuDetailCategoriesFieldProps = {
  value: Category[];
  setValue: React.Dispatch<SetStateAction<Category[]>>;
  categories: AdminCategoriesData[];
};

const MenuDetailCategoriesField: React.FC<MenuDetailCategoriesFieldProps> = ({
  value,
  setValue,
  categories,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (checked: boolean, category: AdminCategoriesData) => {
    if (checked) {
      setValue([...value, category]);
    } else {
      setValue(value.filter((c) => c.id !== category.id));
    }
  };

  const handleValidate = () => {
    if (value.length > 0) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <MenuDetailItem title="カテゴリー">
      {categories.map((category) => (
        <label key={category.id} className="block">
          <input
            type="checkbox"
            value={category.id}
            checked={value.some((c) => c.id === category.id)}
            onChange={(e) => handleChange(e.target.checked, category)}
            onBlur={handleValidate}
          />
          {category.name}
        </label>
      ))}
      {isError && (
        <p className="text-sm text-red-500 mt-1">1つ以上選択してください</p>
      )}
    </MenuDetailItem>
  );
};

export default MenuDetailCategoriesField;
