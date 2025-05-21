"use server";

import { UserSessionRepositoryImpl } from "../repository/UserSessionRepository";
import { hasLoggedInUserUseCase } from "../usecase/UserSessionUsecase";

const loggedInUnusecase = hasLoggedInUserUseCase(UserSessionRepositoryImpl);

export async function hasLoggedInUserInSession(
  sessionId: string
): Promise<boolean> {
  return await loggedInUnusecase(sessionId);
}
