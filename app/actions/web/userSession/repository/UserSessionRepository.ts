// repository/UserSessionRepository.ts

import { prisma } from "@/app/lib/prisma";

export interface UserSessionRepository {
  hasLoggedInUser(sessionId: string): Promise<boolean>;
}

export const UserSessionRepositoryImpl: UserSessionRepository = {
  async hasLoggedInUser(sessionId: string) {
    const session = await prisma.tableSession.findUnique({
      where: { sessionId },
    });
    if (!session) return false;

    const userSessions = await prisma.userSession.findMany({
      where: { tableSessionId: session.id },
    });

    return userSessions.length > 0;
  },
};