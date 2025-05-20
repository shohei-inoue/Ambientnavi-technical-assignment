import { handleGetCategories } from "@/app/actions/admin/categories/controller/CategoriesController";
import CategoriesTable from "../CategoriesTable/CategoriesTable";

const CategoriesContents = async () => {
  const categories = await handleGetCategories();
  return <CategoriesTable categories={categories} />;
};

export default CategoriesContents;
