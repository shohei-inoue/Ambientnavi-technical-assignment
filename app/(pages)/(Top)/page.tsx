import { redirect } from "next/navigation";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TopContent from "./_components/TopContent/TopContent";
import { getSession } from "@/app/actions/admin/tableSession/controller/TableSessionController";

// サーバーコンポーネント
export default async function Top({ searchParams }: { searchParams: { table_number?: string } }) {
  const tableNumber = Number(searchParams.table_number);

  // table_number の存在を確認
  if (!tableNumber || isNaN(tableNumber)) {
    return (
      <MainContainer>
        <MainContent>
          <p className="text-red-500">テーブル番号が不正です</p>
          <p className="text-red-500">スタッフをおよびください</p>
        </MainContent>
      </MainContainer>
    );
  }

  // セッションが既にあるかチェック
  const session = await getSession(tableNumber);

  if (session) {
    // ログイン画面にリダイレクト（クエリを保持）
    redirect(`/auth/login?table_number=${tableNumber}`);
  }

  // セッションがないので EntryForm を表示
  return (
    <MainContainer>
      <MainContent>
        <TopContent tableNumber={tableNumber} />
      </MainContent>
    </MainContainer>
  );
}