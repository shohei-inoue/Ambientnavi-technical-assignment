"use client";

import Form from "@/app/components/Form/form";
import Button from "@/app/components/Button/Button";
import { useState } from "react";
import TableIsAvailableField from "../../../[id]/_components/TableContent/TableIsAvailableField";
import { handleCreateTable } from "@/app/actions/admin/table/controller/TableController";
import TableNumberField from "../../../[id]/_components/TableContent/TableNumberField";

const TablesAddForm = () => {
  const [tNumber, setTNumber] = useState<number>(1);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm("テーブルを追加しますか?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("number", tNumber.toString());
    formData.append("isAvailable", String(isAvailable));

    try {
      const res = await fetch("/api/admin/tables", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      alert("テーブルを追加しました");
      setTNumber(1);
      setIsAvailable(true);
    } catch (error: any) {
      console.error(error);
      alert(`テーブルを追加できませんでした。\n${error.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TableNumberField value={tNumber} setValue={setTNumber} />
      <TableIsAvailableField value={isAvailable} setValue={setIsAvailable} />
      <Button type="submit">追加する</Button>
    </Form>
  );
};

export default TablesAddForm;
