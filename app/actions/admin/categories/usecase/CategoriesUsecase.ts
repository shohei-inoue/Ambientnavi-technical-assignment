import { CategoriesRepository } from "../repository/CategoriesRepository";

export function createCategoryUsecase(cr: CategoriesRepository) {
  return async (name: string, subCategories: string[]) => {
    if (await cr.existsByName(name)) {
      throw new Error("同じ名前のカテゴリがすでに存在します");
    }
    return cr.createCategory(name, subCategories);
  };
}

export function getCategoriesUsecase(cr: CategoriesRepository) {
  return async () => cr.getCategories();
}

export function getCategoryUsecase(cr: CategoriesRepository) {
  return async (id: number) => cr.getCategory(id);
}

export function updateCategoryUsecase(cr: CategoriesRepository) {
  return async (id: number, name: string, subCategories: string[]) => {
    if (await cr.existsByName(name, id)) {
      throw new Error("同じ名前のカテゴリがすでに存在します");
    }
    return cr.updateCategory(id, name, subCategories);
  };
}

export function deleteCategoryUsecase(cr: CategoriesRepository) {
  return async (id: number) => cr.deleteCategory(id);
}
