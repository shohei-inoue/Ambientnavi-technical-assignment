type MenuNavItemProps = {
  title: string;
  id: string;
};

const MenuHeadNavItem: React.FC<MenuNavItemProps> = ({ title, id }) => {
  return (
    <li key={id} className="text-center">
      <a href={`#${id}`} className="text-sm text-gray-700 hover:text-blue-500">
        {title}
      </a>
    </li>
  );
};

export default MenuHeadNavItem;
