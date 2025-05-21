import { prisma } from "@/app/lib/prisma";
import { Order, OrderCreateInput } from "../domain/OrderDomain";

export interface OrderRepository {
  createOrder(order: OrderCreateInput): Promise<void>;
  getOrders(tableId: number): Promise<Order[]>;
}

export const OrderRepositoryImpl: OrderRepository = {
  async createOrder(order: OrderCreateInput) {
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

  async getOrders(tableId) {
    const orders = await prisma.order.findMany({
      where: { tableId },
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      tableId: order.tableId,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.orderItems.map((item) => ({
        menuId: item.menuId,
        quantity: item.quantity,
        note: item.note ?? undefined,
        menuName: item.menu.name,
        price: item.menu.price,
      })),
    }));
  },
};
