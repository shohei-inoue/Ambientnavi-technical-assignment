import { ReactNode } from "react";

type MenuDetailItemProps = {
  title: string;
  children: ReactNode;
};

const MenuDetailItem: React.FC<MenuDetailItemProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col md:flex-row py-6 border-b border-gray-300">
      <h2 className="flex-shrink-0 w-full md:max-w-[160px] text-base mb-4 md:mb-0">
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default MenuDetailItem;
