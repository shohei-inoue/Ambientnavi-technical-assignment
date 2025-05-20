"use server";

import { logoutUser } from "../usecase/LogoutUsecase";

export async function logout() {
  await logoutUser();
}