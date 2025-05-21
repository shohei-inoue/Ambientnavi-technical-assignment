import { prisma } from "@/app/lib/prisma";
import { Order } from "../domain/OrderDomain";

export interface OrderRepository {
  createOrder(order: Order): Promise<void>;
}

export const OrderRepositoryImpl: OrderRepository = {
  async createOrder(order) {
    await prisma.order.create({
      data: {
        tableId: order.tableId,
        orderItems: {
          create: order.items.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            note: item.note,
          })),
        },
      },
    });
  },
};
