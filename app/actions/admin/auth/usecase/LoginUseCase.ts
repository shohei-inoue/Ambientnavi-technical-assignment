import { compare } from "bcryptjs";
import { AdminUserRepository } from "../repository/AdminUserRepository";

export function loginAdmin(repo: AdminUserRepository) {
  return async (employeeNumber: string, password: string) => {
    const user = await repo.getByEmployeeNumber(employeeNumber);

    if (!user) {
      return { success: false, error: "ユーザーが見つかりません" };
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "パスワードが正しくありません" };
    }

    return { success: true, adminUser: user };
  };
}
