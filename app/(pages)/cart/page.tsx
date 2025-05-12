import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CartContents from "./_components/CartContents/CartContents";

export default function Cart() {
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <CartContents />
      </MainContent>
    </MainContainer>
  );
}
