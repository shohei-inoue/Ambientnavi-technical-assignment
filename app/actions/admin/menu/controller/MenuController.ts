"use server";

import {
  createMenuUsecase,
  deleteMenuUsecase,
  getMenuDetailUsecase,
  getMenusUsecase,
  updateMenuUsecase,
} from "@/app/actions/admin/menu/usecase/MenuUsecase";
import { MenuRepositoryImpl } from "../repository/MenuRepository";

const getMenus = getMenusUsecase(MenuRepositoryImpl);
const getMenuDetail = getMenuDetailUsecase(MenuRepositoryImpl);
const createMenu = createMenuUsecase(MenuRepositoryImpl);
const updateMenu = updateMenuUsecase(MenuRepositoryImpl);
const deleteMenu = deleteMenuUsecase(MenuRepositoryImpl);

export async function handleGetMenu() {
  return await getMenus();
}

export async function handleGetMenuDetail(id: number) {
  return await getMenuDetail(id);
}

export async function handleCreateMenu(formData: FormData) {
  return await createMenu(formData);
}

export async function handleUpdateMenu(formData: FormData) {
  return await updateMenu(formData);
}

export async function handleDeleteMenu(id: number) {
  return await deleteMenu(id);
}
