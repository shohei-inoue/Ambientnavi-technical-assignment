type MenuNavItemProps = {
  name: string;
  id: number;
  isActive: boolean;
  onSelect: (id: number) => void;
};

const MenuHeadNavItem: React.FC<MenuNavItemProps> = ({
  name,
  id,
  isActive,
  onSelect,
}) => {
  return (
    <li key={id} className="text-center">
      <button
        onClick={() => onSelect(id)}
        className={`text-sm hover:text-blue-500 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`}
      >
        {name}
      </button>
    </li>
  );
};

export default MenuHeadNavItem;
