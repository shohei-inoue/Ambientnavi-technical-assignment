import MenuCard from "./MenuCard";

type MenuItemData = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const MenuItemDataList: MenuItemData[] = [
  {
    id: 1,
    name: "Menu Item 1",
    price: 1000,
    image: "",
  },
  {
    id: 2,
    name: "Menu Item 2",
    price: 2000,
    image: "",
  },
  {
    id: 3,
    name: "Menu Item 3",
    price: 3000,
    image: "",
  },
  {
    id: 4,
    name: "Menu Item 4",
    price: 4000,
    image: "",
  },
  {
    id: 5,
    name: "Menu Item 5",
    price: 5000,
    image: "",
  },
  {
    id: 6,
    name: "Menu Item 6",
    price: 6000,
    image: "",
  },
];

const MenuGrid = () => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MenuItemDataList.map((item) => (
        <MenuCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
        />
      ))}
    </ul>
  );
};

export default MenuGrid;
