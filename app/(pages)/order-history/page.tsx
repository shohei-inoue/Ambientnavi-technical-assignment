export const dynamic = "force-dynamic";

import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import OrderHistoryContents from "./_components/OrderHistoryContents/OrderHistoryContents";
import { requireUserSession } from "@/app/lib/auth";

export default async function OrderHistory() {
  await requireUserSession()
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <OrderHistoryContents />
      </MainContent>
    </MainContainer>
  );
}
