export const dynamic = "force-dynamic";

import HeadNav from "@/app/components/HeadNav/HeadNav";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CartContents from "./_components/CartContents/CartContents";
import { requireUserSession } from "@/app/lib/auth";

export default async function Cart() {
  await requireUserSession()
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <CartContents />
      </MainContent>
    </MainContainer>
  );
}
