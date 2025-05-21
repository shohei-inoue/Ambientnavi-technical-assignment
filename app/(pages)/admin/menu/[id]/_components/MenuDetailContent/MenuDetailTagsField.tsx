"use client";

import { SetStateAction, useEffect, useState } from "react";
import MenuDetailItem from "./MenuDetailItem";

type MenuDetailTagsFieldProps = {
  value: string[];
  setValue: React.Dispatch<SetStateAction<string[]>>;
};

const MenuDetailTagsField: React.FC<MenuDetailTagsFieldProps> = ({
  value,
  setValue,
}) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput("");
  }, [value]);

  const handleAdd = () => {
    const tag = input.trim().toLowerCase();
    if (tag && !value.includes(tag)) {
      setValue([...value, tag]);
    }
    setInput("");
  };

  const handleRemove = (index: number) => {
    setValue(value.filter((_, i) => i !== index));
  };

  return (
    <MenuDetailItem title="タグ">
      <div className="flex flex-wrap gap-2">
        {value.filter(Boolean).map((tag, index) => (
          <span
            key={tag + index}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder="タグを入力して Enter または , で追加"
        className="border p-2 w-full rounded my-2"
      />
    </MenuDetailItem>
  );
};

export default MenuDetailTagsField;
