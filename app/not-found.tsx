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

    const num = Number(tableNumber.trim());

    if (!num || isNaN(num) || num <= 0) {
      alert("有効なテーブル番号を入力してください");
      return;
    }

    router.push(`/?table_number=${num}`);
  };

  return (
    <MainContainer>
      <MainContent>
        {/* // TODO テスト用も含めたNotFoundページ */}
        <h1 className="text-4xl font-bold mb-4">
          404 - ページが見つかりません
        </h1>
        <p className="mb-6 text-gray-600">
          お探しのページは存在しないか、削除された可能性があります。
        </p>
        <p className="mb-4 text-gray-600">
          QRコードでアクセスした場合は、QRコードが誤っている可能性があります。
        </p>
        <p className="mb-6 text-gray-600">
          テーブル番号がわかる方は、以下に入力してください。
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
