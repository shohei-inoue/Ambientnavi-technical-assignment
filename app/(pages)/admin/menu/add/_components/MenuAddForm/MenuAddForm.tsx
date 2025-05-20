"use client";

import MenuDetailNameFiled from "../../../[id]/_components/MenuDetailContent/MenuDetailNameField";
import MenuDetailDescriptionField from "../../../[id]/_components/MenuDetailContent/MenuDetailDescriptionField";
import MenuDetailPriceField from "../../../[id]/_components/MenuDetailContent/MenuDetailPriceField";
import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/form";
import { useEffect, useState } from "react";
import MenuDetailCategoriesField from "../../../[id]/_components/MenuDetailContent/MenuDetailCategoriesField";
import MenuDetailIsAvailableField from "../../../[id]/_components/MenuDetailContent/MenuDetailIsAvailableField";
import MenuDetailTaxIncludedField from "../../../[id]/_components/MenuDetailContent/MenuDetailTaxIncludedField";
import MenuDetailImageField from "../../../[id]/_components/MenuDetailContent/MenuDetailImageField";
import MenuDetailTagsField from "../../../[id]/_components/MenuDetailContent/MenuDetailTagsField";
import { createMenu } from "@/app/actions/admin/menuActions";
import { handleGetCategories } from "@/app/actions/admin/categories/controller/CategoriesController";
import { Category } from "@/app/actions/admin/categories/domain/Categories";

const MenuAddForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [taxIncluded, setTaxIncluded] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [categoriesData, setCategoriesData] = useState<Category[]>(
    []
  );

  // categories情報を取得
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await handleGetCategories();
        setCategoriesData(categories);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // カテゴリーのバリデーション
    if (!subCategoryId) {
      alert("サブカテゴリを選択してください");
      return;
    }

    // ダイアログの表示
    const isConfirmed = window.confirm("メニューを追加しますか?");
    if (!isConfirmed) {
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("isAvailable", String(isAvailable));
    formData.append("taxIncluded", String(taxIncluded));
    formData.append("subCategoryId", subCategoryId.toString());
    formData.append("tags", tags.join(","));

    try {
      await createMenu(formData);
      alert("メニューを追加しました");
      setName("");
      setDescription("");
      setPrice(0);
      setImage(undefined);
      setIsAvailable(true);
      setTaxIncluded(true);
      setTags([]);
      setSubCategoryId(null);
    } catch (error) {
      console.error(error);
      alert(`メニューを追加できませんでした. \n${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <MenuDetailImageField value={image} setValue={setImage} />
      <MenuDetailNameFiled value={name} setValue={setName} />
      <MenuDetailDescriptionField
        value={description}
        setValue={setDescription}
      />
      <MenuDetailPriceField value={price} setValue={setPrice} />
      <MenuDetailTaxIncludedField
        value={taxIncluded}
        setValue={setTaxIncluded}
      />
      {loading ? (
        <div>ロード中</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : categoriesData ? (
        <MenuDetailCategoriesField
          value={subCategoryId}
          setValue={setSubCategoryId}
          categories={categoriesData}
        />
      ) : (
        <div>カテゴリーがありません</div>
      )}
      <MenuDetailTagsField value={tags} setValue={setTags} />
      <MenuDetailIsAvailableField
        value={isAvailable}
        setValue={setIsAvailable}
      />
      <Button type="submit">登録する</Button>
    </Form>
  );
};

export default MenuAddForm;
