"use client";

import MainContainer from "./components/MainContainer/MainContainer";
import MainContent from "./components/MainContainer/MainContent";
import Button from "./components/Button/Button";
import Form from "./components/Form/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [tableNumber, setTableNumber] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d+$/.test(tableNumber)) {
      alert("テーブル番号は半角数字で入力してください");
      return;
    }

    console.log("リダイレクト開始:", tableNumber);
    router.replace(`/?table_number=${tableNumber}`);
  };

  return (
    <MainContainer>
      <MainContent>
        {/* // TODO テスト用も含めたNotFoundページ */}
        <h1 className="text-4xl font-bold mb-4">
          404 - ページが見つかりません
        </h1>
        <p className="mb-6 text-gray-600">
          QRコードが無効か、テーブル情報が見つかりませんでした。
        </p>
        <p className="mb-6 text-gray-600">
          テーブル番号を入力することで再アクセスできます。
        </p>
        <p className="mb-6 text-gray-600">
          その他の方はスタッフをおよびください
        </p>

        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="border rounded px-3 py-2 mb-4 w-full"
            placeholder="例: 12"
          />
          <Button type="submit">テーブル番号でアクセス</Button>
        </Form>
      </MainContent>
    </MainContainer>
  );
}
