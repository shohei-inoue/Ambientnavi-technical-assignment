'use client'

import Button from "@/app/components/Button/Button"
import Heading from "@/app/components/Heading/Heading"
import { useRouter } from "next/navigation";

const CategoriesHeadingContainer = () => {
  const router = useRouter();
  
    const handleClick = () => {
      router.push("/admin/categories/add");
    };

  return (
    <div className="flex justify-between gap-4 items-center w-full px-4">
      <Heading level={1}>カテゴリー</Heading>
      <Button size="fixed" type="button" onClick={handleClick}>
        カテゴリーを追加
      </Button>
    </div>
  )
}

export default CategoriesHeadingContainer