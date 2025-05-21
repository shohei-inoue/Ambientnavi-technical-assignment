export const dynamic = "force-dynamic";

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import RegisterContents from "./_components/RegisterContents/RegisterContents";
import { notFound } from "next/navigation";

type RegisterProps = {
  searchParams: Promise<{
    table_number?: string;
  }>;
};

export default async function Register({ searchParams }: RegisterProps) {
  const params = await searchParams;
  const tableNumber = Number(params?.table_number);

  if (!tableNumber || isNaN(tableNumber)) {
      return notFound();
    }

  return (
    <MainContainer>
      <Heading level={1}>会員登録</Heading>
      <MainContent>
        <RegisterContents tableNumber={tableNumber} />
      </MainContent>
    </MainContainer>
  );
}
