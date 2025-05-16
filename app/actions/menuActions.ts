"use server";

import { prisma } from "../lib/prisma";


export async function createMenu(formData: FormData) {
  const name = formData.get('name') as string
  const price = parseInt(formData.get('price') as string, 10)
  const description = formData.get('description') as string

  await prisma.menu.create({
    data: {
      name,
      price,
      description,
      isAvailable: true,
      taxIncluded: true,
      tags: [],
      categoryId: 'some-category-id', // TODO 仮置き
    }
  })
}
