import { MenuData } from "@/app/types/types";
import MenuCard from "./MenuCard";

type MenuGridProps = {
  menu: MenuData[]
}

const MenuGrid: React.FC<MenuGridProps> = ({ menu }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menu.map((menuItem) => (
        <MenuCard
          key={menuItem.id}
          id={menuItem.id}
          name={menuItem.name}
          price={menuItem.price}
          image={menuItem.imageUrl}
        />
      ))}
    </ul>
  );
};

export default MenuGrid;
