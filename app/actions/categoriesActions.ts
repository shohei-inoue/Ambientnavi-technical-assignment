"use server";

import { prisma } from "../lib/prisma";

export async function CreateCategory(formData: FormData) {
  const name = formData.get("name") as string;

  await prisma.category.create({
    data: {
      name,
    },
  });
}
