import { Order, OrderCreateInput } from "../domain/OrderDomain";
import { OrderRepository } from "../Repository/OrderRepository";

export function createOrderUsecase(or: OrderRepository) {
  return async (order: OrderCreateInput) => {
    await or.createOrder(order);
  };
}

export function getOrdersUsecase(or: OrderRepository) {
  return async (tableId: number) => {
    return await or.getOrders(tableId);
  };
}
