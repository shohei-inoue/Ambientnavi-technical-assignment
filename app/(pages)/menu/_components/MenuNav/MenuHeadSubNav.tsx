"use client";

import React from "react";
import { SubCategoryData } from "@/app/types/types";

type MenuHeadSubNavProps = {
  subCategories: SubCategoryData[];
};

const MenuHeadSubNav: React.FC<MenuHeadSubNavProps> = ({ subCategories }) => {
  return (
    <nav className="flex overflow-x-auto gap-4 p-4 bg-gray-50">
      {subCategories.map((sub) => (
        <a
          key={sub.id}
          href={`#sub-${sub.id}`}
          className="text-sm text-gray-700 hover:text-blue-500 whitespace-nowrap"
        >
          {sub.name}
        </a>
      ))}
    </nav>
  );
};

export default MenuHeadSubNav;
