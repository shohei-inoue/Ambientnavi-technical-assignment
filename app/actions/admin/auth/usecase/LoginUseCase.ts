import { compare } from "bcryptjs";
import { signJwt } from "@/app/lib/jwt";
import { UserRepository } from "../repository/UserRepository";
import { TableSessionRepository } from "../../tableSession/repository/TableSessionRepository";

// login
export function loginUser(ur: UserRepository, tr: TableSessionRepository) {
  return async (email: string, password: string, sessionId: string) => {
    const user = await ur.getUserByEmail(email);
    if (!user) throw new Error("ユーザーが見つかりません");

    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error("パスワードが間違っています");

    const token = signJwt({ id: user.id, email: user.email });

    await tr.linkUserToTableSession(sessionId, user.id);

    return { user, token };
  };
}
