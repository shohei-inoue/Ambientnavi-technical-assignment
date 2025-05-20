export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TopContent from "./_components/TopContent/TopContent";
import { notFound } from "next/navigation";

type TopProps = {
  searchParams: Promise<{
    table_number?: string;
  }>;
};

export default async function Top({ searchParams }: TopProps) {
  const params = await searchParams;
  const tableNumber = Number(params?.table_number);

  if (!tableNumber || isNaN(tableNumber)) {
    return notFound();
  }

  return (
    <MainContainer>
      <MainContent>
        <TopContent tableNumber={tableNumber} />
      </MainContent>
    </MainContainer>
  );
}
