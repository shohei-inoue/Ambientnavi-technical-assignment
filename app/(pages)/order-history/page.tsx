import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import OrderHistoryContents from "./_components/OrderHistoryContents/OrderHistoryContents";

export default function OrderHistory() {
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <OrderHistoryContents />
      </MainContent>
    </MainContainer>
  );
}
