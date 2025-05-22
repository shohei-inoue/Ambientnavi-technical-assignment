"use client";

import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/form";
import { useEffect, useState } from "react";
import MenuDetailImageField from "./MenuDetailImageField";
import MenuDetailNameFiled from "./MenuDetailNameField";
import MenuDetailDescriptionField from "./MenuDetailDescriptionField";
import MenuDetailPriceField from "./MenuDetailPriceField";
import MenuDetailTaxIncludedField from "./MenuDetailTaxIncludedField";
import MenuDetailCategoriesField from "./MenuDetailCategoriesField";
import MenuDetailTagsField from "./MenuDetailTagsField";
import MenuDetailIsAvailableField from "./MenuDetailIsAvailableField";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import { handleGetCategories } from "@/app/actions/admin/categories/controller/CategoriesController";
import { Category } from "@/app/actions/admin/categories/domain/Categories";
import {
  handleUpdateMenu,
  handleDeleteMenu,
} from "@/app/actions/admin/menu/controller/MenuController";

type MenuDetailSettingFormProps = {
  id: number;
  menu_name: string;
  menu_description: string;
  menu_price: number;
  menu_image_url: string;
  menu_is_available: boolean;
  menu_tax_included: boolean;
  menu_sub_category_id: number;
  menu_tags: string[];
};

const MenuDetailSettingForm: React.FC<MenuDetailSettingFormProps> = ({
  id,
  menu_name,
  menu_description,
  menu_price,
  menu_image_url,
  menu_is_available,
  menu_tax_included,
  menu_tags,
  menu_sub_category_id,
}) => {
  const router = useRouter();
  const [name, setName] = useState(menu_name);
  const [description, setDescription] = useState(menu_description);
  const [price, setPrice] = useState(menu_price);
  const [image, setImage] = useState<File>();
  const [isAvailable, setIsAvailable] = useState(menu_is_available);
  const [taxIncluded, setTaxIncluded] = useState(menu_tax_included);
  const [tags, setTags] = useState<string[]>(menu_tags);
  const [subCategoryId, setSubCategoryId] = useState(menu_sub_category_id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categories = await handleGetCategories();
        setCategoriesData(categories);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subCategoryId) {
      alert("サブカテゴリを選択してください");
      return;
    }

    const isConfirmed = window.confirm("メニューを更新しますか?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("id", id.toString());
    if (image) formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("isAvailable", String(isAvailable));
    formData.append("taxIncluded", String(taxIncluded));
    formData.append("subCategoryId", subCategoryId.toString());
    formData.append("tags", tags.join(","));

    try {
      await handleUpdateMenu(formData);
      alert("メニュー情報を更新しました");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(`メニュー情報を更新できませんでした: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("メニューを削除しますか?");
    if (!isConfirmed) return;

    try {
      await handleDeleteMenu(id);
      alert("メニュー情報を削除しました");
      router.back();
    } catch (err: any) {
      console.error(err);
      alert(`メニュー情報を削除できませんでした: ${err.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <MenuDetailImageField
        image_url={menu_image_url}
        value={image}
        setValue={setImage}
      />
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
        <Loader />
      ) : error ? (
        <div>{error.message}</div>
      ) : categoriesData.length > 0 ? (
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
      <div className="flex gap-2">
        <Button type="reset" onClick={handleDelete}>
          削除
        </Button>
        <Button type="submit">更新</Button>
      </div>
    </Form>
  );
};

export default MenuDetailSettingForm;
