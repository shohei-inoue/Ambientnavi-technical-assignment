import { CategoryData } from "@/app/types/types";
import MenuItem from "./MenuHeadNavItem";

type MenuHeadNavProps = {
  categories: CategoryData[];
};

const MenuHeadNav: React.FC<MenuHeadNavProps> = ({ categories }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
      <ul className="flex justify-around bg-gray-100 p-4">
        {categories.map((category) => (
          <MenuItem key={category.id} name={category.name} id={category.id} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuHeadNav;
