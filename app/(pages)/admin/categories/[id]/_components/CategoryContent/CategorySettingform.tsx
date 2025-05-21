"use client";

import Form from "@/app/components/Form/form";
import CategoryNameFiled from "./CategoryNameField";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubCategoryField from "./SubCategoryField";
import {
  handleUpdateCategory,
  handleDeleteCategory,
} from "@/app/actions/admin/categories/controller/CategoriesController";

type CategorySettingFormProps = {
  id: number;
  category_name: string;
  sub_categories: string[];
};

const CategorySettingForm: React.FC<CategorySettingFormProps> = ({
  id,
  category_name,
  sub_categories,
}) => {
  const router = useRouter();
  const [name, setName] = useState<string>(category_name);
  const [subCategories, setSubCategories] = useState<string[]>(sub_categories);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm("カテゴリーを更新しますか?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("name", name);
    subCategories.forEach((sub) => formData.append("subCategories", sub));

    try {
      await handleUpdateCategory(formData);
      alert("カテゴリー情報を更新しました");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "カテゴリー情報を更新できませんでした");
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("このカテゴリー情報を削除しますか?");
    if (!isConfirmed) return;

    try {
      await handleDeleteCategory(id);
      alert("カテゴリー情報を削除しました");
      router.back();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "カテゴリー情報を削除できませんでした");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryNameFiled value={name} setValue={setName} />
      <SubCategoryField value={subCategories} setValue={setSubCategories} />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-4">
        <Button type="reset" onClick={handleDelete}>
          削除
        </Button>
        <Button type="submit">変更</Button>
      </div>
    </Form>
  );
};

export default CategorySettingForm;