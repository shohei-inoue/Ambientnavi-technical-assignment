"use client";

import Form from "@/app/components/Form/form";
import { useState } from "react";
import EntryPeopleNumField from "./EntryPeoPleNumField";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

type EntryFormProps = {
  tableNumber: number;
};

const EntryForm: React.FC<EntryFormProps> = ({ tableNumber }) => {
  console.log(tableNumber)
  const router = useRouter();
  const [peopleNum, setPeopleNum] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tableNumber", tableNumber.toString());
    formData.append("guestCount", peopleNum.toString());

    console.log(peopleNum)

    try {
      const res = await fetch("/api/web/tables/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "登録に失敗しました");
        return;
      }

      alert("テーブルを登録しました");
      router.push(`/auth/login?table_number=${tableNumber}`);
    } catch (error) {
      console.error("エラー:", error);
      alert("サーバーエラーが発生しました");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EntryPeopleNumField value={peopleNum} setValue={setPeopleNum} />
      <Button type="submit" size="fixed">
        人数を確定
      </Button>
    </Form>
  );
};

export default EntryForm;
