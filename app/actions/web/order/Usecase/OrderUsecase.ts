import { Order } from "../domain/OrderDomain";
import { OrderRepository } from "../Repository/OrderRepository";

export function createOrderUsecase(or: OrderRepository) {
  return async (order: Order) => {
    await or.createOrder(order);
  };
}
