// 'use client'

// import { useState } from "react"
import MenuTable from "../MenuTable/MenuTable";

const MenuContents = () => {
  // const [loading, setLoading] = useState(true)
  return (
    <>
      {/* {loading ? (
      <div>ロード中...</div>
    ) : (
      <div>データが見つかりませんでした</div>
    )} */}
      <MenuTable />
    </>
  );
};

export default MenuContents;
