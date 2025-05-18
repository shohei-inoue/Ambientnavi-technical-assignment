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
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          isActive
            ? "bg-blue-100 text-blue-600 font-bold border-b-2 border-blue-500"
            : "text-gray-700 hover:text-blue-500"
        }`}
      >
        {name}
      </button>
    </li>
  );
};

export default MenuHeadNavItem;
