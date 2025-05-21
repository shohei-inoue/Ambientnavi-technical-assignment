import { prisma } from "@/app/lib/prisma";
import { CategoryData } from "../domain/Categories";

export interface CategoriesRepository {
  getCategories(): Promise<CategoryData[]>;
}

export const CategoriesRepositoryImpl: CategoriesRepository = {
  async getCategories() {
    const raw = await prisma.category.findMany({
      include: {
        subCategories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return raw.map((category) => ({
      id: category.id,
      name: category.name,
      subCategories: category.subCategories.map((sub) => ({
        id: sub.id,
        name: sub.name,
        category: {
          id: category.id,
          name: category.name,
          subCategories: [],
        },
      })),
    }));
  },
};