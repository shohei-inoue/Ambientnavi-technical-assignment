import Image from "next/image";
import MenuItemBottomNav from "../MenuItemNav/MenuItemBottomNav";
import Heading from "@/app/components/Heading/Heading";

type MenuItemContentProps = {
  id: string;
}

type OptionData = {
  id: number;
  name: string;
}

const OptionList: OptionData[] = [
  { id: 1, name: "のりしお" },
  { id: 2, name: "塩" },
  { id: 3, name: "ガーリック" },
  { id: 4, name: "バター醤油" },
];

const MenuItemContent: React.FC<MenuItemContentProps> = ({ id }) => {
  return (
    <>
      <div id={id}>
        <div>
          <Image
            src={""}
            alt="Menu Item"
            width={100}
            height={100} 
          />
        </div>
        <div className="flex flex-col justify-between gap-4 p-4">
          <div className="flex justify-between items-center">
            <Heading level={2}>ちょこっとポテトフライ</Heading>
            <p>99円</p>
          </div>
          <div className="flex justify-around items-center">
            <button className="p-4 bg-gray-500 text-white">-</button>
            <span> 1 </span>
            <button className="p-4 bg-gray-500 text-white">+</button>
          </div>
          <div>
            <ul className="grid grid-cols-2 gap-4">
              {OptionList.map((option) => (
                <li key={option.id} className="flex justify-between items-center p-4 border">
                  <span>{option.name}</span>
                  <input type="checkbox" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <MenuItemBottomNav />
    </>
  )
}

export default MenuItemContent