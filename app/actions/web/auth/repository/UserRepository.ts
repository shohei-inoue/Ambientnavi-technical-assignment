import { prisma } from "@/app/lib/prisma";
import { User } from "../domain/User";

export interface UserRepository {
  createUser(user: Omit<User, "id" | "uuid">): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}

export const UserRepositoryImpl: UserRepository = {
  async createUser(user) {
    const created = await prisma.user.create({
      data: {
        ...user,
        uuid: crypto.randomUUID(),
        role: user.role || "CUSTOMER",
      },
    });

    return {
      id: created.id,
      uuid: created.uuid,
      name: created.name,
      email: created.email,
      password: created.password,
      birthday: created.birthday,
      gender: created.gender,
      role: created.role,
      employeeNumber: created.employeeNumber ?? undefined,
    };
  },

  async getUserByEmail(email) {
    const found = await prisma.user.findUnique({ where: { email } });

    if (!found) return null;

    return {
      id: found.id,
      uuid: found.uuid,
      name: found.name,
      email: found.email,
      password: found.password,
      birthday: found.birthday,
      gender: found.gender,
      role: found.role,
      employeeNumber: found.employeeNumber ?? undefined,
    };
  },
};
