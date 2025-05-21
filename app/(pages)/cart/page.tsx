export const dynamic = "force-dynamic";

import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CartContents from "./_components/CartContents/CartContents";
import { requireUserSession } from "@/app/lib/auth";
import { handleGetCart } from "@/app/actions/web/cart/controller/CartController";
import NoData from "@/app/components/NoData/NoData";

export default async function Cart() {
  await requireUserSession();
  try {
    const cart = await handleGetCart();
    return (
      <MainContainer>
        <HeadNav />
        <MainContent>
          <CartContents cart={cart} />
        </MainContent>
      </MainContainer>
    );
  } catch (error) {
    return (
      <MainContainer>
        <HeadNav />
        <MainContent>
          <NoData />
        </MainContent>
      </MainContainer>
    );
  }
}
