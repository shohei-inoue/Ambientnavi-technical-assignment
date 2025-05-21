import { prisma } from "@/app/lib/prisma";
import { AdminUser } from "../domain/User";

export interface AdminUserRepository {
  getByEmployeeNumber(employeeNumber: string): Promise<AdminUser | null>;
  createAdminUser(data: Omit<AdminUser, "id">): Promise<void>;
  updateUserRoleAndEmployeeNumber(
    id: number,
    role: "ADMIN",
    employeeNumber: string
  ): Promise<void>;
}

export const UserRepositoryImpl: AdminUserRepository = {
  async getByEmployeeNumber(employeeNumber) {
    const admin = await prisma.user.findFirst({
      where: {
        employeeNumber,
        role: "ADMIN",
      },
    });

    if (!admin) return null;

    return {
      id: admin.id,
      uuid: admin.uuid,
      name: admin.name,
      email: admin.email,
      password: admin.password,
      birthday: admin.birthday,
      gender: admin.gender,
      role: admin.role,
      employeeNumber: admin.employeeNumber!,
    };
  },

  async createAdminUser(data) {
    await prisma.user.create({
      data: {
        uuid: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        birthday: data.birthday,
        gender: data.gender,
        role: "ADMIN",
        employeeNumber: data.employeeNumber,
      },
    });
  },

  async updateUserRoleAndEmployeeNumber(id, role, employeeNumber) {
    await prisma.user.update({
      where: { id },
      data: { role, employeeNumber },
    });
  },
};
