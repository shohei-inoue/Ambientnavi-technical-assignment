"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type MenuCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${id}`);
  };

  return (
    <li
      key={id}
      className="flex-column justify-between p-4 border cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div>
        {/* TODO default直がきやめる */}
        <Image src={image || "/default.png"} height={100} width={100} alt="" />
      </div>
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-500">Price: ${price}</p>
      </div>
    </li>
  );
};

export default MenuCard;
