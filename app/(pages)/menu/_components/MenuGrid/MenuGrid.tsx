"use client";

import { MenuData } from "@/app/types/types";
import MenuCard from "./MenuCard";

type MenuGridProps = {
  menu: MenuData[];
};

const MenuGrid: React.FC<MenuGridProps> = ({ menu }) => {
  const groupedMenu = Object.entries(
    menu.reduce(
      (acc, item) => {
        const key = item.subCategory.id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<number, MenuData[]>
    )
  );

  return (
    <div className="space-y-8">
      {groupedMenu.map(([subCategoryId, items]) => (
        <section key={subCategoryId} id={`sub-${subCategoryId}`}>
          <h2 className="text-xl font-bold mb-4">
            {items[0].subCategory.name}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((menuItem) => (
              <MenuCard
                key={menuItem.id}
                id={menuItem.id}
                name={menuItem.name}
                price={menuItem.price}
                image={menuItem.imageUrl}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default MenuGrid;
