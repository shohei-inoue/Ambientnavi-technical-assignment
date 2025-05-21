"use client";

import { useState } from "react";
import MenuItemBottomNav from "./MenuItemBottomNav";
import { MenuData } from "@/app/types/types";
import MenuItemHeadContent from "./MenuItemHeadContent";
import MenuItemQuantityField from "./MenuItemQuantityField";
import MenuItemTagsContents from "./MenuItemTagsContents";
import MenuItemDescriptionContent from "./MenuItemDescriptionContent";

type MenuItemContentProps = {
  menu: MenuData;
};

const MenuItemContents: React.FC<MenuItemContentProps> = ({ menu }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex-col">
      <MenuItemHeadContent imageUrl={menu.imageUrl} name={menu.name} />
      <MenuItemDescriptionContent
        name={menu.name}
        price={menu.price}
        taxIncluded={menu.taxIncluded}
        description={menu.description}
      />
      <MenuItemQuantityField value={quantity} setValue={setQuantity} />

      {menu.tags.length > 0 && <MenuItemTagsContents tags={menu.tags} />}
      <MenuItemBottomNav menuId={menu.id} quantity={quantity} />
    </div>
  );
};

export default MenuItemContents;
