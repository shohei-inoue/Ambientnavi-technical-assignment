import { prisma } from "@/app/lib/prisma";
import { UserSession } from "../domain/UserSession";

export interface UserSessionRepository {
  getUserSessionsByTableSessionId(tableSessionId: number): Promise<UserSession[]>;
}

export const UserSessionRepositoryImpl: UserSessionRepository = {
  async getUserSessionsByTableSessionId(tableSessionId: number) {
    return await prisma.userSession.findMany({
      where: { tableSessionId },
    });
  },
};