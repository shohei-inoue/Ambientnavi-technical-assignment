import { CategoryData } from "@/app/types/types";
import MenuHeadNavItem from "./MenuHeadNavItem";

type MenuHeadNavProps = {
  categories: CategoryData[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
};

const MenuHeadNav: React.FC<MenuHeadNavProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
      <ul className="flex justify-around bg-gray-100 p-4">
        {categories.map((category) => (
          <MenuHeadNavItem
            key={category.id}
            id={category.id}
            name={category.name}
            isActive={selectedCategoryId === category.id}
            onSelect={onSelectCategory}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MenuHeadNav;
