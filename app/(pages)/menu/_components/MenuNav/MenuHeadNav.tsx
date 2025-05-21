import MenuHeadNavItem from "./MenuHeadNavItem";
import { Category } from "@/app/actions/admin/categories/domain/Categories";

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
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow overflow-x-auto">
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
      </ul>
    </nav>
  );
};

export default MenuHeadNav;
