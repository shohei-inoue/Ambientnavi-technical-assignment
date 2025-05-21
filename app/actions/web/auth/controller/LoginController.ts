"use server";

import { UserRepositoryImpl } from "../repository/UserRepository";
import { TableSessionRepositoryImpl } from "@/app/actions/web/tableSession/repository/TableSessionRepository";
import {
  getSessionCookie,
  setAuthCookie,
  setSessionCookie,
} from "@/app/lib/cookies";
import { signJwt } from "@/app/lib/jwt";
import { loginUser } from "../usecase/LoginUseCase";

const loginUsecase = loginUser(UserRepositoryImpl, TableSessionRepositoryImpl);

export async function handleLogin(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const sessionId =
      formData.get("sessionId")?.toString() || (await getSessionCookie());

    if (!email || !password) {
      return {
        success: false,
        error: "メールアドレスとパスワードは必須です。",
      };
    }

    if (!sessionId) {
      return {
        success: false,
        error: "セッションIDが見つかりません。QRコードから再入場してください。",
      };
    }

    const { user } = await loginUsecase(email, password, sessionId);

    const token = signJwt({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);
    await setSessionCookie(sessionId);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "ログインに失敗しました",
    };
  }
}
