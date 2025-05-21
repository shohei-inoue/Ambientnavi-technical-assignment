"use client";

import Heading from "@/app/components/Heading/Heading";
import MenuHeadNav from "../MenuNav/MenuHeadNav";
import MenuContent from "../MenuContent/MenuContent";
import MenuBottomNav from "../MenuNav/MenuBottomNav";
import { useEffect, useState } from "react";
import MenuHeadSubNav from "../MenuNav/MenuHeadSubNav";
import { Category } from "@/app/actions/web/menu/domain/Menu";

type MenuContentsProps = {
  categories: Category[];
};

const MenuContents: React.FC<MenuContentsProps> = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const category = categories.find((cat) => cat.id === selectedCategoryId);
    setSelectedCategoryName(category?.name ?? null);
  }, [selectedCategoryId, categories]);

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
        <MenuHeadSubNav
          subCategories={selectedCategory.subCategories}
          activeSubCategoryId={activeSubCategoryId}
          onSelectSubCategory={setActiveSubCategoryId}
        />
      )}
      <Heading level={1}>メニュー</Heading>
      <MenuContent
        categoryId={selectedCategoryId}
        categoryName={selectedCategoryName}
      />
      <MenuBottomNav />
    </div>
  );
};

export default MenuContents;
