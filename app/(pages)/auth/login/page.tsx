export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import LoginContents from "./_components/LoginContents/LoginContents";

type LoginProps = {
  searchParams: Promise<{
    table_number?: string;
  }>;
};

export default async function Login({ searchParams }: LoginProps) {
  const params = await searchParams;
  const tableNumber = Number(params?.table_number);

  if (!tableNumber || isNaN(tableNumber)) {
    return notFound();
  }

  return (
    <MainContainer>
      <Heading level={1}>ログイン</Heading>
      <MainContent>
        <LoginContents tableNumber={tableNumber} />
      </MainContent>
    </MainContainer>
  );
}
