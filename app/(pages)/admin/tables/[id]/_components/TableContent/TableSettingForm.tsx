"use client";

import Form from "@/app/components/Form/form";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableNumberField from "./TableNumberField";
import TableIsAvailableField from "./TableIsAvailableField";

type TableSettingFormProps = {
  id: number;
  tableNumber: number;
  tableIsAvailable: boolean;
};

const TableSettingForm: React.FC<TableSettingFormProps> = ({
  id,
  tableNumber,
  tableIsAvailable,
}) => {
  const router = useRouter();
  const [tNumber, setTNumber] = useState<number>(tableNumber);
  const [isAvailable, setIsAvailable] = useState<boolean>(tableIsAvailable);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm("テーブルを更新しますか?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("number", tNumber.toString());
    formData.append("isAvailable", String(isAvailable));

    try {
      const res = await fetch(`/api/admin/tables/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "更新に失敗しました");
      }

      alert("テーブル情報を更新しました");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(`テーブル情報を更新できませんでした: ${error}`);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("このテーブル情報を削除しますか?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/tables/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "削除に失敗しました");
      }

      alert("テーブル情報を削除しました");
      router.back();
    } catch (error) {
      console.error(error);
      alert(`テーブル情報を削除できませんでした: ${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TableNumberField value={tNumber} setValue={setTNumber} />
      <TableIsAvailableField value={isAvailable} setValue={setIsAvailable} />
      <div className="flex gap-4">
        <Button type="reset" onClick={handleDelete}>
          削除
        </Button>
        <Button type="submit">変更</Button>
      </div>
    </Form>
  );
};

export default TableSettingForm;
