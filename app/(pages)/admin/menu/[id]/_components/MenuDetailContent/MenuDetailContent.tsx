"use client";

import Error from "next/error";
import { useState } from "react";

type MenuDetailContentProps = {
  id: number;
};

const MenuDetailContent: React.FC<MenuDetailContentProps> = ({ id }) => {
  const [menuData, setMenuData] = useState<number>(0); // TODO 仮置き
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  return (
    <div>
      {loading ? (
        <div>TODO スケルトンを追加</div>
      ) : error ? (
        <div>エラー</div>
      ) : menuData ? (
        <div>menuDetailSettingField</div>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
};

export default MenuDetailContent;
