import Heading from "@/app/components/Heading/Heading";
import OrderHistoryContent from "../OrderHistoryContent/OrderHistoryContent";
import OrderHistoryBottomNav from "../OrderHistoryNav/OrderHistoryBottomNav";

const OrderHistoryContents = () => {
  return (
    <div>
      <Heading level={1}>Order History</Heading>
      <OrderHistoryContent />
      <OrderHistoryBottomNav />
    </div>
  );
};

export default OrderHistoryContents;
