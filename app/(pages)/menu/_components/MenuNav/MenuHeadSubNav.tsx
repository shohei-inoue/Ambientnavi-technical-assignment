"use client";

import { SubCategory } from "@/app/actions/web/menu/domain/Menu";
import React from "react";

type MenuHeadSubNavProps = {
  subCategories: SubCategory[];
  activeSubCategoryId: number | null;
  onSelectSubCategory: (id: number) => void;
};

const MenuHeadSubNav: React.FC<MenuHeadSubNavProps> = ({
  subCategories,
  activeSubCategoryId,
   onSelectSubCategory,
}) => {
  return (
    <nav className="fixed w-full left-0 overflow-x-auto bg-gray-50">
      <ul className="flex gap-4 p-4 min-w-fit w-max">
        {subCategories.map((sub) => (
          <li key={sub.id}>
            <a
              href={`#sub-${sub.id}`}
              onClick={() => onSelectSubCategory(sub.id)}
              className={`px-4 py-2 rounded transition-colors duration-200 whitespace-nowrap ${
                activeSubCategoryId === sub.id
                  ? "bg-blue-100 text-blue-600 font-bold border-b-2 border-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {sub.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuHeadSubNav;
