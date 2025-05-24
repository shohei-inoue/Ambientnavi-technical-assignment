import { prisma } from "@/app/lib/prisma";
import { Category } from "../domain/Categories";
export const runtime = "nodejs";

export interface CategoriesRepository {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | null>;
  createCategory(name: string, subCategoryNames: string[]): Promise<void>;
  updateCategory(
    id: number,
    name: string,
    subCategoryNames: string[]
  ): Promise<void>;
  deleteCategory(id: number): Promise<void>;
  existsByName(name: string, excludeId?: number): Promise<boolean>;
}

export const CategoriesRepositoryImpl: CategoriesRepository = {
  // get categories implement
  async getCategories() {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          include: {
            _count: {
              select: { menus: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      subCategories: cat.subCategories.map((sc) => ({
        id: sc.id,
        name: sc.name,
        menuCount: sc._count.menus,
      })),
    }));
  },

  // get category implement
  async getCategory(id) {
    const cat = await prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: {
          include: {
            _count: { select: { menus: true } },
          },
        },
      },
    });

    if (!cat) return null;

    return {
      id: cat.id,
      name: cat.name,
      subCategories: cat.subCategories.map((sc) => ({
        id: sc.id,
        name: sc.name,
        menuCount: sc._count.menus,
      })),
    };
  },

  // create category implement
  async createCategory(name, subCategoryNames) {
    await prisma.category.create({
      data: {
        name,
        subCategories: {
          create: subCategoryNames
            .filter((n) => n.trim())
            .map((name) => ({ name })),
        },
      },
    });
  },

  // update category implement
  async updateCategory(id, name, subCategoryNames) {
    await prisma.$transaction(async (tx) => {
      await tx.menuTag.deleteMany({
        where: {
          menu: {
            subCategory: { categoryId: id },
          },
        },
      });

      await tx.menu.deleteMany({
        where: {
          subCategory: { categoryId: id },
        },
      });

      await tx.subCategory.deleteMany({ where: { categoryId: id } });

      await tx.category.update({
        where: { id },
        data: {
          name,
          subCategories: {
            create: subCategoryNames.map((name) => ({ name })),
          },
        },
      });
    });
  },

  // delete category implement
  async deleteCategory(id) {
    await prisma.$transaction(async (tx) => {
      const subCategories = await tx.subCategory.findMany({
        where: { categoryId: id },
        select: { id: true },
      });

      const subCategoryIds = subCategories.map((sc) => sc.id);

      await tx.menuTag.deleteMany({
        where: {
          menu: {
            subCategoryId: { in: subCategoryIds },
          },
        },
      });

      await tx.menu.deleteMany({
        where: {
          subCategoryId: { in: subCategoryIds },
        },
      });

      await tx.subCategory.deleteMany({ where: { categoryId: id } });
      await tx.category.delete({ where: { id } });
    });
  },

  // exists by name implement
  async existsByName(name, excludeId) {
    const existing = await prisma.category.findFirst({
      where: {
        name,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });
    return !!existing;
  },
};
