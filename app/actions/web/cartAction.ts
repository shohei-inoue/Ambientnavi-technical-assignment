"use server";

import { prisma } from "@/app/lib/prisma";

export async function createCart(tableSessionId: number) {
  return await prisma.cart.create({
    data: {
      tableSessionId,
    },
  });
}

export async function addCart(
  cartId: number,
  menuId: number,
  quantity: number,
  note?: string
) {
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId,
      menuId,
    },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        note: note ?? existingItem.note,
      },
    });
  } else {
    return await prisma.cartItem.create({
      data: {
        cartId,
        menuId,
        quantity,
        note,
      },
    });
  }
}

export async function addToSessionCart(
  tableSessionId: number,
  menuId: number,
  quantity: number,
  note?: string
) {
  let cart = await prisma.cart.findUnique({
    where: { tableSessionId },
  });

  if (!cart) {
    cart = await createCart(tableSessionId);
  }

  return await addCart(cart.id, menuId, quantity, note);
}

export async function getCartBySessionId(tableSessionId: number) {
  return await prisma.cart.findFirst({
    where: { tableSessionId },
    include: {
      items: {
        include: {
          menu: true,
        },
      },
    },
  });
}

export async function deleteCartBySessionId(tableSessionId: number) {
  const cart = await prisma.cart.findFirst({
    where: { tableSessionId },
    include: { items: true },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.delete({ where: { id: cart.id } });
}
