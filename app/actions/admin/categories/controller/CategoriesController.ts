import { CategoriesRepositoryImpl } from "../repository/CategoriesRepository";
import {
  createCategoryUsecase,
  deleteCategoryUsecase,
  getCategoriesUsecase,
  getCategoryUsecase,
  updateCategoryUsecase,
} from "../usecase/CategoriesUsecase";

const createCategory = createCategoryUsecase(CategoriesRepositoryImpl);
const getCategories = getCategoriesUsecase(CategoriesRepositoryImpl);
const getCategory = getCategoryUsecase(CategoriesRepositoryImpl);
const updateCategory = updateCategoryUsecase(CategoriesRepositoryImpl);
const deleteCategory = deleteCategoryUsecase(CategoriesRepositoryImpl);

export async function handleCreateCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const subCategories = formData.getAll("subCategories") as string[];
  return createCategory(name, subCategories);
}

export async function handleGetCategories() {
  return getCategories();
}

export async function handleGetCategory(id: number) {
  return getCategory(id);
}

export async function handleUpdateCategory(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;
  const subCategories = formData.getAll("subCategories") as string[];
  return updateCategory(id, name, subCategories);
}

export async function handleDeleteCategory(id: number) {
  return deleteCategory(id);
}
