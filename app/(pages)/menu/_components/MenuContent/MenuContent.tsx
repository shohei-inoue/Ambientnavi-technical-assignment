"use client";

import { useEffect, useState } from "react";
import Heading from "@/app/components/Heading/Heading";
import MenuGrid from "../MenuGrid/MenuGrid";
import { MenuData } from "@/app/types/types";

type MenuContentProps = {
  categoryId: number | null;
  categoryName: string | null;
};

const MenuContent: React.FC<MenuContentProps> = ({
  categoryId,
  categoryName,
}) => {
  const [menu, setMenu] = useState<MenuData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const url =
          categoryId !== null
            ? `/api/web/menu?categoryId=${categoryId}`
            : `/api/web/menu`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("メニュー取得に失敗しました");

        const data: MenuData[] = await res.json();
        setMenu(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [categoryId]);

  return (
    <div className="px-4 py-6">
      <Heading level={2}>{categoryName || ""}</Heading>
      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <MenuGrid menu={menu} />}
    </div>
  );
};

export default MenuContent;
