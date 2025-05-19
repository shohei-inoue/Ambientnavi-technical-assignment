import { getSessionCookie, setAuthCookie } from "@/app/lib/cookies";
import { UserRepositoryImpl } from "../repository/UserRepository";
import { loginUser } from "../usecase/LoginUseCase";
import { TableSessionRepositoryImpl } from "../../tableSession/repository/TableSessionRepository";

// instance
const loginUsecase = loginUser(UserRepositoryImpl, TableSessionRepositoryImpl);

export async function login(
  email: string,
  password: string,
  sessionId: string
) {
  const { user, token } = await loginUsecase(email, password, sessionId);
  return { user, token };
}
