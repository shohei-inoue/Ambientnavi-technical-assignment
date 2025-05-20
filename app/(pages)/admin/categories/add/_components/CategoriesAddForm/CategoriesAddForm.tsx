"use client";

import { createCategory } from "@/app/actions/admin/categoriesActions";
import Form from "@/app/components/Form/form";
import CategoryNameFiled from "../../../[id]/_components/CategoryNameField/CategoryNameField";
import Button from "@/app/components/Button/Button";
import { useState } from "react";
import SubCategoryField from "../../../[id]/_components/SubCategoryField/SubCategoryField";

const CategoriesAddForm = () => {
  const [name, setName] = useState<string>("");
  const [subCategories, setSubCategories] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーション
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

    // ダイアログの表示
    const isConfirmed = window.confirm("カテゴリーを追加しますか?");
    if (!isConfirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    subCategories.forEach((sc) => {
      formData.append("subCategories", sc);
    });

    try {
      await createCategory(formData);
      alert("カテゴリーを追加しました");
      setName("");
      setSubCategories([""]);
    } catch (error) {
      console.error(error);
      alert(`カテゴリーを追加できませんでした. \n${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryNameFiled value={name} setValue={setName} />
      <SubCategoryField value={subCategories} setValue={setSubCategories} />
      <Button type="submit">追加する</Button>
    </Form>
  );
};

export default CategoriesAddForm;
