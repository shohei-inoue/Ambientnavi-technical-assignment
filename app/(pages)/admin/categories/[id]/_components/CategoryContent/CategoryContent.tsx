"use client";
import CategorySettingForm from "./CategorySettingForm";
import { Category } from "@/app/actions/admin/categories/domain/Categories";

type CategoryContentProps = {
  category: Category;
};

const CategoryContent: React.FC<CategoryContentProps> = ({ category }) => {
  const subCategoryNames = category.subCategories.map((sc) => sc.name);
  return (
    <CategorySettingForm
      id={category.id}
      category_name={category.name}
      sub_categories={subCategoryNames}
    />
  );
};

export default CategoryContent;
