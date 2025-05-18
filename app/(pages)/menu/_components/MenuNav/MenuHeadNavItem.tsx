type MenuNavItemProps = {
  name: string;
  id: number;
};

const MenuHeadNavItem: React.FC<MenuNavItemProps> = ({ name, id }) => {
  return (
    <li key={id} className="text-center">
      <a href={`#${id}`} className="text-sm text-gray-700 hover:text-blue-500">
        {name}
      </a>
    </li>
  );
};

export default MenuHeadNavItem;
