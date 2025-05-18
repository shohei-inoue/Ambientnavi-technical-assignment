"use client";

import { AdminCategoryData } from "@/app/types/types";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader/Loader";
import Error from "@/app/components/Error/Error";
import NoData from "@/app/components/NoData/NoData";
import { getCategory } from "@/app/actions/admin/categoriesActions";
import CategorySettingForm from "../CategorySettingForm/CategorySettingform";

type CategoryContentProps = {
  id: string;
};

const CategoryContent: React.FC<CategoryContentProps> = ({ id }) => {
  const [categoryData, setCategoryData] = useState<AdminCategoryData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = await getCategory(parseInt(id));
        setCategoryData(category);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : categoryData ? (
        <CategorySettingForm
          id={categoryData.id}
          category_name={categoryData.name}
          sub_categories={categoryData.subCategories.map((sub) => sub.name)}
        />
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CategoryContent;
