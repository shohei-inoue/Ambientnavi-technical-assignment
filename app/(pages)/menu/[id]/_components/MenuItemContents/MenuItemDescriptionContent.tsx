import Heading from "@/app/components/Heading/Heading";

type MenuItemDescriptionContentProps = {
  name: string;
  price: number;
  taxIncluded: boolean;
  description: string;
};

const MenuItemDescriptionContent: React.FC<MenuItemDescriptionContentProps> = ({
  name,
  price,
  taxIncluded,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-4">
      <div className="flex justify-between items-center w-full">
        <Heading level={2}>{name}</Heading>
        <p className="text-lg font-semibold text-gray-700">
          {price}円{taxIncluded ? "(税込)" : "(税抜き)"}
        </p>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default MenuItemDescriptionContent;