"use server";

import { MenuRepositoryImpl } from "../repository/MenuRepository";
import {
  getMenuByCategoryIdUsecase,
  getMenuDetailUsecase,
} from "../usecase/MenuUsecase";

const getMenuByCategory = getMenuByCategoryIdUsecase(MenuRepositoryImpl);
const getMenuDetail = getMenuDetailUsecase(MenuRepositoryImpl);

export async function handleGetMenu(categoryId: number | null) {
  return await getMenuByCategory(categoryId);
}

export async function handleGetMenuDetail(id: number) {
  return await getMenuDetail(id);
}
