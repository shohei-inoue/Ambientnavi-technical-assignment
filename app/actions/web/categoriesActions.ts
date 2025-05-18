import { CategoryData } from "@/app/types/types";
import { prisma } from "@/app/lib/prisma";

export async function getCategories(): Promise<CategoryData[]> {
  const rawCategories = await prisma.category.findMany({
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

  const categories: CategoryData[] = rawCategories.map((category) => ({
    id: category.id,
    name: category.name,
    subCategories: category.subCategories.map((sub) => ({
      id: sub.id,
      name: sub.name,
      category: {
        id: category.id,
        name: category.name,
        subCategories: [], // 再帰参照を防ぐため空配列
      },
    })),
  }));

  return categories;
}
