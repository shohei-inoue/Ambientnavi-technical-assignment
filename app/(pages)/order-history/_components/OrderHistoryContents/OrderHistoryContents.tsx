import Heading from "@/app/components/Heading/Heading";
import OrderHistoryContent from "../OrderHistoryContent/OrderHistoryContent";
import OrderHistoryBottomNav from "../OrderHistoryNav/OrderHistoryBottomNav";
import { Order } from "@/app/actions/web/order/domain/OrderDomain";

type OrderHistoryContentsProps = {
  orderHistories: Order[];
};

const OrderHistoryContents: React.FC<OrderHistoryContentsProps> = ({
  orderHistories,
}) => {
  return (
    <div>
      <Heading level={1}>Order History</Heading>
      <OrderHistoryContent orderHistories={orderHistories} />
      <OrderHistoryBottomNav />
    </div>
  );
};

export default OrderHistoryContents;