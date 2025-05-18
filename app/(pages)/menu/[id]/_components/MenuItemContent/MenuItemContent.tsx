import Image from "next/image";
import MenuItemBottomNav from "../MenuItemNav/MenuItemBottomNav";
import Heading from "@/app/components/Heading/Heading";
import { MenuData } from "@/app/types/types";

type MenuItemContentProps = {
  menu: MenuData;
};

const MenuItemContent: React.FC<MenuItemContentProps> = ({ menu }) => {
  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="w-full h-60 relative">
          <Image
            src={menu.imageUrl || "/default.png"}
            alt={menu.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-between items-center">
            <Heading level={2}>{menu.name}</Heading>
            <p className="text-lg font-semibold text-gray-700">
              {menu.price}円{menu.taxIncluded  ? "(税込)" : "(税抜き)"}
            </p>
          </div>

          <p className="text-gray-600">{menu.description}</p>

          <div className="flex justify-around items-center">
            <button className="w-10 h-10 bg-gray-300 text-lg rounded">-</button>
            <span className="text-lg font-semibold">1</span>
            <button className="w-10 h-10 bg-gray-300 text-lg rounded">+</button>
          </div>

          {menu.tags.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">タグ</h3>
              <ul className="flex flex-wrap gap-2">
                {menu.tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="px-3 py-1 border rounded text-sm bg-gray-100"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <MenuItemBottomNav />
    </>
  );
};

export default MenuItemContent;
