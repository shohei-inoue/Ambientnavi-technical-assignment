"use client";

import { getMenuDetail } from "@/app/actions/menuActions";
import { MenuData, TagData } from "@/app/types/types";
import { useEffect, useState } from "react";
import MenuDetailSettingForm from "../MenuDetailSettingForm/MenuDetailSettingForm";
import Loader from "@/app/components/Loader/Loader";
import Error from "@/app/components/Error/Error";
import NoData from "@/app/components/NoData/NoData";

type MenuDetailContentProps = {
  id: string;
};

const MenuDetailContent: React.FC<MenuDetailContentProps> = ({ id }) => {
  const [menuDetailData, setMenuDetailData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenuDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const menuDetail = await getMenuDetail(parseInt(id));
        setMenuDetailData(menuDetail);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetail();
  }, [id]);

  const handleFormateTags = (tags: TagData[]): string[] => {
    return tags.map((tag) => tag.name);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : menuDetailData ? (
        <MenuDetailSettingForm
          id={menuDetailData.id}
          menu_name={menuDetailData.name}
          menu_description={menuDetailData.description}
          menu_price={menuDetailData.price}
          menu_image_url={menuDetailData.imageUrl}
          menu_categories={menuDetailData.categories}
          menu_is_available={menuDetailData.isAvailable}
          menu_tags={handleFormateTags(menuDetailData.tags)}
          menu_tax_included={menuDetailData.taxIncluded}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default MenuDetailContent;
