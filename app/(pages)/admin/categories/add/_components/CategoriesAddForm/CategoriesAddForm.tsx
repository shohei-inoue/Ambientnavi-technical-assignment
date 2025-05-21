"use client";

import Form from "@/app/components/Form/form";
import CategoryNameFiled from "../../../[id]/_components/CategoryContent/CategoryNameField";
import Button from "@/app/components/Button/Button";
import { useState } from "react";
import SubCategoryField from "../../../[id]/_components/CategoryContent/SubCategoryField";
import { handleCreateCategory } from "@/app/actions/admin/categories/controller/CategoriesController";

const CategoriesAddForm = () => {
  const [name, setName] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSubs = subCategories
      .map((sc) => sc.trim())
      .filter((sc) => sc !== "");

    if (filteredSubs.length === 0) {
      alert("1つ以上のサブカテゴリ名を入力してください");
      return;
    }

    const duplicates = filteredSubs.filter(
      (item, index) => filteredSubs.indexOf(item) !== index
    );
    if (duplicates.length > 0) {
      alert(`サブカテゴリ名が重複しています: ${duplicates.join(", ")}`);
      return;
    }

    if (!name.trim()) {
      alert("カテゴリ名を入力してください");
      return;
    }

    const isConfirmed = window.confirm("カテゴリーを追加しますか?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("name", name);
    filteredSubs.forEach((sc) => formData.append("subCategories", sc));

    try {
      await handleCreateCategory(formData);
      alert("カテゴリーを追加しました");
      setName("");
      setSubCategories([""]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "カテゴリーの追加に失敗しました");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryNameFiled value={name} setValue={setName} />
      <SubCategoryField value={subCategories} setValue={setSubCategories} />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">追加する</Button>
    </Form>
  );
};

export default CategoriesAddForm;
