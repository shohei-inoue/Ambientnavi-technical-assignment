"use server";

import { signJwt } from "@/app/lib/jwt";
import { UserRepositoryImpl } from "../repository/AdminUserRepository";
import { loginAdmin } from "../usecase/LoginUseCase";
import { setAuthCookie } from "@/app/lib/cookies";

const loginUsecase = loginAdmin(UserRepositoryImpl);

export async function handleAdminLogin(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}> {
  try {
    const employeeNumber = formData.get("employeeNumber")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!employeeNumber || !password) {
      return {
        success: false,
        error: "社員番号とパスワードを入力してください。",
      };
    }

    const result = await loginUsecase(employeeNumber, password);

    if (!result.success || !result.adminUser) {
      return {
        success: false,
        error: result.error || "ログイン失敗",
      };
    }

    const token = signJwt({
      id: result.adminUser.id,
      email: result.adminUser.email,
      role: result.adminUser.role,
    });

    await setAuthCookie(token);

    return {
      success: true,
      user: {
        id: result.adminUser.id,
        email: result.adminUser.email,
        name: result.adminUser.name,
        role: result.adminUser.role,
      },
    };
  } catch (error: any) {
    console.error("ログイン処理エラー:", error);
    return {
      success: false,
      error: "ログイン処理中にエラーが発生しました。",
    };
  }
}
