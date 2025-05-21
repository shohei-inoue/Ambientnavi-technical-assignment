"use client";

import { useState } from "react";
import MenuHeadNavItem from "./MenuHeadNavItem";
import { Category } from "@/app/actions/admin/categories/domain/Categories";
import HeaderHamBurgerMenu from "@/app/components/HeaderHamburgerMenu/HeaderHamBurgerMenu";

type MenuHeadNavProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
};

const MenuHeadNav: React.FC<MenuHeadNavProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed p-4 top-0 left-0 right-0 z-10 bg-white shadow overflow-x-auto">
      <ul className="flex gap-4 p-4 max-w-screen-sm mx-auto overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <MenuHeadNavItem
            key={category.id}
            id={category.id}
            name={category.name}
            isActive={selectedCategoryId === category.id}
            onSelect={onSelectCategory}
          />
        ))}
        <li>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-4 top-4"
            aria-label="メニューを開く"
          >
            <span className="material-symbols-rounded text-3xl">menu</span>
          </button>
        </li>
      </ul>
      {menuOpen && (
        <HeaderHamBurgerMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default MenuHeadNav;
