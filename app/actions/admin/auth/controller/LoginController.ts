"use server";

import { UserRepositoryImpl } from "../repository/UserRepository";
import { loginUser } from "../usecase/LoginUseCase";
import { TableSessionRepositoryImpl } from "../../../web/tableSession/repository/TableSessionRepository";

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
