"use client";

import { SetStateAction } from "react";
import CategoryItem from "../CategoryContent/CategoryItem";

type SubCategoryFieldProps = {
  value: string[];
  setValue: React.Dispatch<SetStateAction<string[]>>;
};

const SubCategoryField: React.FC<SubCategoryFieldProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    setValue(updated);
  };

  const handleAdd = () => {
    setValue([...value, ""]);
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    setValue(updated);
  };

  return (
    <CategoryItem title="サブカテゴリー">
      {value.map((subCategory, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={subCategory}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`サブカテゴリ ${index + 1}`}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-500"
            disabled={value.length === 1}
          >
            <span className="material-symbols-rounded">delete</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        ＋追加
      </button>
    </CategoryItem>
  );
};

export default SubCategoryField;
