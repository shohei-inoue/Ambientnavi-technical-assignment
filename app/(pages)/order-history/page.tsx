export const dynamic = "force-dynamic";

import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import OrderHistoryContents from "./_components/OrderHistoryContents/OrderHistoryContents";
import { requireUserSession } from "@/app/lib/auth";
import { handleGetOrders } from "@/app/actions/web/order/controller/OrderController";

export default async function OrderHistory() {
  await requireUserSession();
  const orderHistories = await handleGetOrders();

  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <OrderHistoryContents orderHistories={orderHistories} />
      </MainContent>
    </MainContainer>
  );
}
