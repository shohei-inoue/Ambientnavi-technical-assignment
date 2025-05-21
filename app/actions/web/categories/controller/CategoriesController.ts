"use server";

import { CategoriesRepositoryImpl } from "../repository/CategoriesRepository";
import { getCategoriesUsecase } from "../usecase/CategoriesUsecase";

const getCategories = getCategoriesUsecase(CategoriesRepositoryImpl);

export async function handleGetCategories() {
  return await getCategories();
}