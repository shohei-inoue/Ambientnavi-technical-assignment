"use client";

import Heading from "@/app/components/Heading/Heading";
import MenuHeadNav from "../MenuNav/MenuHeadNav";
import MenuContent from "../MenuContent/MenuContent";
import MenuBottomNav from "../MenuNav/MenuBottomNav";
import { useState } from "react";
import { CategoryData } from "@/app/types/types";
import MenuHeadSubNav from "../MenuNav/MenuHeadSubNav";

type MenuContentsProps = {
  categories: CategoryData[];
};

const MenuContents: React.FC<MenuContentsProps> = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  return (
    <div>
      <MenuHeadNav
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      {selectedCategory && (
        <MenuHeadSubNav subCategories={selectedCategory.subCategories} />
      )}
      <Heading level={1}>Menu</Heading>
      <MenuContent categoryId={selectedCategoryId}/>
      <MenuBottomNav />
    </div>
  );
};

export default MenuContents;
