import { Role, Gender } from "../domain/User";
import { prisma } from "@/app/lib/prisma";
import { AdminUserRepository } from "../repository/AdminUserRepository";
import { hash } from "bcryptjs";

export interface RegisterAdminParams {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
  employeeNumber: string;
}

export function registerAdminUser(repo: AdminUserRepository) {
  return async (
    input: RegisterAdminParams
  ): Promise<{ success: boolean; error?: string }> => {
    const { name, email, password, birthday, gender, employeeNumber } = input;

    // 入力バリデーション
    if (
      !name ||
      !email ||
      !password ||
      !birthday ||
      !gender ||
      !employeeNumber
    ) {
      return { success: false, error: "すべての項目を入力してください。" };
    }

    if (!(["MALE", "FEMALE", "OTHER"] as Gender[]).includes(gender)) {
      return { success: false, error: "性別の値が不正です。" };
    }

    if (isNaN(birthday.getTime())) {
      return { success: false, error: "生年月日が無効です。" };
    }

    // 社員番号の重複チェック
    const existingByEmployee = await repo.getByEmployeeNumber(employeeNumber);
    if (existingByEmployee) {
      return {
        success: false,
        error: "この社員番号はすでに登録されています。",
      };
    }

    // メールの重複チェック
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      if (existingByEmail.role === "ADMIN") {
        return {
          success: false,
          error: "このメールアドレスはすでに管理者として登録されています。",
        };
      }

      // 昇格対応
      await repo.updateUserRoleAndEmployeeNumber(
        existingByEmail.id,
        "ADMIN",
        employeeNumber
      );
      return { success: true };
    }

    // パスワードハッシュ化 & 新規登録
    const hashedPassword = await hash(password, 10);
    await repo.createAdminUser({
      name,
      email,
      password: hashedPassword,
      birthday,
      gender,
      role: "ADMIN",
      employeeNumber,
      uuid: crypto.randomUUID(),
    });

    return { success: true };
  };
}
