import { prisma } from "@/app/lib/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return categories;
}
