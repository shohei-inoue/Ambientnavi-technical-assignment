"use client";

import { createCategory } from "@/app/actions/admin/categoriesActions";
import Form from "@/app/components/Form/form";
import CategoryNameFiled from "../../../[id]/_components/CategoryNameField/CategoryNameField";
import Button from "@/app/components/Button/Button";
import { useState } from "react";

const CategoriesAddForm = () => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ダイアログの表示
    const isConfirmed = window.confirm("カテゴリーを追加しますか?");
    if (!isConfirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    try {
      await createCategory(formData);
      alert("カテゴリーを追加しました");
      setName("");
    } catch (error) {
      console.error(error);
      alert(`カテゴリーを追加できませんでした. \n${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryNameFiled value={name} setValue={setName} />
      <Button type="submit">追加する</Button>
    </Form>
  );
};

export default CategoriesAddForm;
