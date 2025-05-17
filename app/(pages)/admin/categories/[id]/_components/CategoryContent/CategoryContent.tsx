"use client";

import { getCategory } from "@/app/actions/categoriesActions";
import { categoryData } from "@/app/types/types";
import { useEffect, useState } from "react";
import CategorySettingForm from "../CategorySettingForm/CategorySettingForm";
import Loader from "@/app/components/Loader/Loader";
import Error from "@/app/components/Error/Error";
import NoData from "@/app/components/NoData/NoData";

type CategoryContentProps = {
  id: string;
};

const CategoryContent: React.FC<CategoryContentProps> = ({ id }) => {
  const [categoryData, setCategoryData] = useState<categoryData | null>(null);
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
        />
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CategoryContent;
