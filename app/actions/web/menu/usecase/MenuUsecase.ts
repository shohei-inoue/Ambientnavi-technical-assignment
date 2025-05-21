import { MenuRepository } from "../repository/MenuRepository";

export function getMenuByCategoryIdUsecase(mr: MenuRepository) {
  return async (categoryId: number | null) => {
    return await mr.getMenuByCategoryId(categoryId);
  };
}

export function getMenuDetailUsecase(mr: MenuRepository) {
  return async (id: number) => {
    return await mr.getMenuDetail(id);
  };
}
