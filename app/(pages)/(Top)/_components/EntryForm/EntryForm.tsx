"use client";

import Form from "@/app/components/Form/form";
import { useState } from "react";
import EntryPeopleNumField from "./EntryPeoPleNumField";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { createSession } from "@/app/actions/web/tableSession/controller/TableSessionController";

type EntryFormProps = {
  tableNumber: number;
};

const EntryForm: React.FC<EntryFormProps> = ({ tableNumber }) => {
  const router = useRouter();
  const [peopleNum, setPeopleNum] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!tableNumber || isNaN(tableNumber)) {
        setError("無効なテーブル番号です");
        return;
      }

      if (!peopleNum || isNaN(peopleNum) || peopleNum <= 0) {
        setError("無効な人数です");
        return;
      }

      await createSession(tableNumber, peopleNum);

      alert("テーブルを登録しました");
      router.push(`/auth/login?table_number=${tableNumber}`);
    } catch (err: any) {
      console.error("セッション作成エラー:", err);
      alert(err.message || "セッション作成に失敗しました");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EntryPeopleNumField value={peopleNum} setValue={setPeopleNum} />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" size="fixed">
        人数を確定
      </Button>
    </Form>
  );
};

export default EntryForm;