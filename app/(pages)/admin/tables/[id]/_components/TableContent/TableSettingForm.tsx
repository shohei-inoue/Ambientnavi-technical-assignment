"use client";

import Form from "@/app/components/Form/form";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableNumberField from "./TableNumberField";
import TableIsAvailableField from "./TableIsAvailableField";
import {
  handleDeleteTable,
  handleUpdateTable,
} from "@/app/actions/admin/table/controller/TableController";

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
    formData.append("id", id.toString());
    formData.append("number", tNumber.toString());
    formData.append("isAvailable", String(isAvailable));

    try {
      await handleUpdateTable(formData);
      alert("テーブル情報を更新しました");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(`テーブル情報を更新できませんでした: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("このテーブル情報を削除しますか?");
    if (!isConfirmed) return;

    try {
      await handleDeleteTable(id);
      alert("テーブル情報を削除しました");
      router.back();
    } catch (error: any) {
      console.error(error);
      alert(`テーブル情報を削除できませんでした: ${error.message}`);
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
