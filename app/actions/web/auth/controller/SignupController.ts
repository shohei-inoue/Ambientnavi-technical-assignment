"use server";

import { UserRepositoryImpl } from "../repository/UserRepository";
import { Gender } from "../domain/User";
import { signupUser } from "../usecase/SignupUseCase";
import {
  getSessionCookie,
  setAuthCookie,
  setSessionCookie,
} from "@/app/lib/cookies";
import { signJwt } from "@/app/lib/jwt";
import { getLinkUserToSession } from "@/app/actions/web/tableSession/controller/TableSessionController";

const signupUsecase = signupUser(UserRepositoryImpl);

export async function handleSignup(formData: FormData): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const birthdayStr = formData.get("birthday")?.toString() ?? "";
    const genderStr = formData.get("gender")?.toString() ?? "";

    if (!name || !email || !password || !birthdayStr || !genderStr) {
      return { success: false, error: "すべての項目を入力してください。" };
    }

    const birthday = new Date(birthdayStr);
    if (isNaN(birthday.getTime())) {
      return { success: false, error: "生年月日が無効です。" };
    }

    const gender = genderStr as Gender;
    if (!["MALE", "FEMALE", "OTHER"].includes(gender)) {
      return { success: false, error: "性別の値が不正です。" };
    }

    const user = await signupUsecase({
      name,
      email,
      password,
      birthdayStr,
      genderStr,
    });

    const sessionId = await getSessionCookie();
    if (!sessionId) {
      return {
        success: false,
        error: "セッションが見つかりません。QRコードから再入場してください。",
      };
    }

    await getLinkUserToSession(user.id);

    const token = signJwt({ id: user.id, email: user.email });

    await setAuthCookie(token);
    await setSessionCookie(sessionId);

    return { success: true, message: "登録が完了しました。" };
  } catch (error: any) {
    return { success: false, error: error.message || "登録に失敗しました" };
  }
}