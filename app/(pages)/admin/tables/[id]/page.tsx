import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import TableContent from "./_components/TableContent/TableContent";
import { handleGetTable } from "@/app/actions/admin/table/controller/TableController";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "テーブル詳細",
};

type AdminTablePageProps = {
  params: { id: string };
};

export default async function AdminTablePage({ params }: AdminTablePageProps) {
  const table = await handleGetTable(Number(params.id));

  if (!table) {
    notFound();
  }

  return (
    <MainContainer>
      <Heading level={1}>テーブル詳細</Heading>
      <MainContent>
        <TableContent table={table} />
      </MainContent>
    </MainContainer>
  );
}
