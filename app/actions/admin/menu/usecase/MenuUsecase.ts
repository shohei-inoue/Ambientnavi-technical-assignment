import { MenuRepository } from "../repository/MenuRepository";

export function getMenusUsecase(repo: MenuRepository) {
  return async () => {
    return await repo.getMenu();
  };
}

export function getMenuDetailUsecase(repo: MenuRepository) {
  return async (id: number) => {
    return await repo.getMenuDetail(id);
  };
}

export function createMenuUsecase(repo: MenuRepository) {
  return async (formData: FormData) => {
    await repo.createMenu(formData);
  };
}

export function updateMenuUsecase(repo: MenuRepository) {
  return async (formData: FormData) => {
    await repo.updateMenu(formData);
  };
}

export function deleteMenuUsecase(repo: MenuRepository) {
  return async (id: number) => {
    await repo.deleteMenu(id);
  };
}