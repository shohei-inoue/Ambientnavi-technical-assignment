"use client";

import { getCategories } from "@/app/actions/categoriesActions";
import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/form";
import { Category } from "@/app/generated/prisma";
import { CategoriesData } from "@/app/types/types";
import { useEffect, useState } from "react";
import MenuDetailImageField from "../MenuDetailImageField/MenuDetailImageField";
import MenuDetailNameFiled from "../MenuDetailName/MenuDetailNameField";
import MenuDetailDescriptionField from "../MenuDetailDescriptionField/MenuDetailDescriptionField";
import MenuDetailPriceField from "../MenuDetailPriceField/MenuDetailPriceField";
import MenuDetailTaxIncludedField from "../MenuDetailTaxIncludedField/MenuDetailTaxIncludedField";
import MenuDetailCategoriesField from "../MenuDetailCategoriesField/MenuDetailCategoriesField";
import MenuDetailTagsField from "../MenuDetailTagsField/MenuDetailTagsField";
import MenuDetailIsAvailableField from "../MenuDetailIsAvailableField/MenuDetailIsAvailableField";
import { deleteMenu, updateMenu } from "@/app/actions/menuActions";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

type MenuDetailSettingFormProps = {
  id: number;
  menu_name: string;
  menu_description: string;
  menu_price: number;
  menu_image_url: string;
  menu_is_available: boolean;
  menu_tax_included: boolean;
  menu_categories: Category[];
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
  menu_categories,
}) => {
  const router = useRouter();
  const [name, setName] = useState<string>(menu_name);
  const [description, setDescription] = useState<string>(menu_description);
  const [price, setPrice] = useState<number>(menu_price);
  const [image, setImage] = useState<File>();
  const [isAvailable, setIsAvailable] = useState<boolean>(menu_is_available);
  const [taxIncluded, setTaxIncluded] = useState<boolean>(menu_tax_included);
  const [tags, setTags] = useState<string[]>(menu_tags);
  const [categories, setCategories] = useState<Category[]>(menu_categories);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoriesData[]>([]);

  // categories情報を取得
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await getCategories();
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
    if (categories.length === 0) {
      alert("カテゴリーを1つ以上選択してください");
      return;
    }

    // ダイアログの表示
    const isConfirmed = window.confirm("メニューを更新しますか?");
    if (!isConfirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id.toString());
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("isAvailable", String(isAvailable));
    formData.append("taxIncluded", String(taxIncluded));
    categories.forEach((category) =>
      formData.append("categoryIds", category.id.toString())
    );
    formData.append("tags", tags.join(","));

    try {
      await updateMenu(formData);
      alert("メニューを更新しました");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(`メニューを更新できませんでした \n${error}`);
    }
  };

  const handleDelete = async () => {
    // ダイアログ表示
    const isConfirmed = window.confirm("メニューを削除しますか?");
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteMenu(id);
      alert("メニューを削除しました");
      router.back();
    } catch (error) {
      console.error(error);
      alert(`メニューを削除できませんでした`);
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
      ) : categories ? (
        <MenuDetailCategoriesField
          value={categories}
          setValue={setCategories}
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
