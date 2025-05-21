import OrderHistoryItem from "../OrderHistoryItem/OrderHistoryItem";
import { Order } from "@/app/actions/web/order/domain/OrderDomain";

type OrderHistoryContentProps = {
  orderHistories: Order[];
};

const OrderHistoryContent: React.FC<OrderHistoryContentProps> = ({
  orderHistories,
}) => {
  // 合計金額を算出
  const totalPrice = orderHistories.reduce((total, order) => {
    return (
      total +
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, 0);

  return (
    <div>
      <ul>
        {orderHistories.map((order) =>
          order.items.map((item, idx) => (
            <OrderHistoryItem
              key={`${order.id}-${idx}`}
              title={item.menuName}
              price={item.price}
              quantity={item.quantity}
              sub_variable={item.note ?? ""}
              sub_variable_price={0} // 仮、必要なら構造見直し
              sub_variable_quantity={0} // 仮
            />
          ))
        )}
      </ul>
      <div className="flex justify-between items-center p-4">
        <h3>合計金額</h3>
        <p>{totalPrice}円</p>
      </div>
    </div>
  );
};

export default OrderHistoryContent;