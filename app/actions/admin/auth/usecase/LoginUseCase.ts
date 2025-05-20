import { compare } from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";
import { TableSessionRepository } from "../../../web/tableSession/repository/TableSessionRepository";

// login
export function loginUser(ur: UserRepository, tr: TableSessionRepository) {
  return async (email: string, password: string, sessionId: string) => {
    const user = await ur.getUserByEmail(email);
    if (!user) throw new Error("ユーザーが見つかりません");

    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error("パスワードが間違っています");

    await tr.linkUserToTableSession(sessionId, user.id);

    return { user };
  };
}