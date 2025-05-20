// usecase/HasLoggedInUserUseCase.ts

import { UserSessionRepository } from "../repository/UserSessionRepository";

export function hasLoggedInUserUseCase(repo: UserSessionRepository) {
  return async (sessionId: string): Promise<boolean> => {
    return await repo.hasLoggedInUser(sessionId);
  };
}