"use client";

import { AdminCategoriesData } from "@/app/types/types";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";
import { useState } from "react";

type MenuDetailSubCategoryFieldProps = {
  value: number | null;
  setValue: (val: number) => void;
  categories: AdminCategoriesData[];
};

const MenuDetailSubCategoryField: React.FC<MenuDetailSubCategoryFieldProps> = ({
  value,
  setValue,
  categories,
}) => {
  const [isError, setIsError] = useState(false);

  const handleChange = (id: number) => {
    setValue(id);
    setIsError(false);
  };

  const handleValidate = () => {
    if (value === null) {
      setIsError(true);
    }
  };

  return (
    <MenuDetailItem title="サブカテゴリー">
      {categories.map((category) => (
        <div key={category.id}>
          <p className="font-semibold">{category.name}</p>
          {category.subCategories.map((sub) => (
            <label key={sub.id} className="block ml-4">
              <input
                type="radio"
                name="subCategoryId"
                value={sub.id}
                checked={value === sub.id}
                onChange={() => handleChange(sub.id)}
                onBlur={handleValidate}
              />
              {sub.name}
            </label>
          ))}
        </div>
      ))}
      {isError && (
        <p className="text-sm text-red-500 mt-1">
          サブカテゴリを1つ選択してください
        </p>
      )}
    </MenuDetailItem>
  );
};

export default MenuDetailSubCategoryField;
