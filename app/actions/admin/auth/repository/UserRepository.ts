import { prisma } from "@/app/lib/prisma";
import { User } from "../domain/User";

export interface UserRepository {
  createUser(user: Omit<User, "id">): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}

export const UserRepositoryImpl: UserRepository = {
  // create user implement
  async createUser(user: Omit<User, "id">): Promise<User> {
    return await prisma.user.create({ data: user });
  },

  // get user by email implement
  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  },
};
