"use client";

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import { useRouter } from "next/navigation";

const TablesHeadingContainer = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/tables/add");
  };

  return (
    <div className="flex justify-between gap-4 items-center w-full px-4">
      <Heading level={1}>テーブル</Heading>
      <Button size="fixed" type="button" onClick={handleClick}>
        テーブルを追加
      </Button>
    </div>
  );
};

export default TablesHeadingContainer;
