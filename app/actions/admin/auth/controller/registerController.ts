"use server";

import { Gender } from "../domain/User";
import { registerAdminUser } from "../usecase/registerUseCase";
import { UserRepositoryImpl } from "../repository/AdminUserRepository";

const registerUsecase = registerAdminUser(UserRepositoryImpl);

export async function handleAdminRegister(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  message?: string;
}> {
  try {
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const birthdayStr = formData.get("birthday")?.toString() ?? "";
    const genderStr = formData.get("gender")?.toString() ?? "";
    const employeeNumber = formData.get("employeeNumber")?.toString() ?? "";

    if (
      !name ||
      !email ||
      !password ||
      !birthdayStr ||
      !genderStr ||
      !employeeNumber
    ) {
      return { success: false, error: "すべての項目を入力してください。" };
    }

    const birthday = new Date(birthdayStr);
    if (isNaN(birthday.getTime())) {
      return { success: false, error: "生年月日が無効です。" };
    }

    const gender = genderStr.toUpperCase() as Gender;
    if (!["MALE", "FEMALE", "OTHER"].includes(gender)) {
      return { success: false, error: "性別の値が不正です。" };
    }

    const result = await registerUsecase({
      name,
      email,
      password,
      birthday,
      gender,
      employeeNumber,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return { success: true, message: "管理者登録が完了しました。" };
  } catch (error: any) {
    console.error("登録エラー:", error);
    return { success: false, error: "登録に失敗しました。" };
  }
}
