import { CategoriesRepository } from "../repository/CategoriesRepository";

export function getCategoriesUsecase(repo: CategoriesRepository) {
  return async () => {
    return await repo.getCategories();
  };
}