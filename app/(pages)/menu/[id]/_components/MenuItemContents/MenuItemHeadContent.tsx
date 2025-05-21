import Heading from "@/app/components/Heading/Heading";
import Image from "next/image";

type MenuItemHeadContentProps = {
  imageUrl: string;
  name: string;
};

const MenuItemHeadContent: React.FC<MenuItemHeadContentProps> = ({
  imageUrl,
  name,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="w-full h-120 relative overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl || "/default.png"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default MenuItemHeadContent;
