"use client";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const TopRegisterButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/register");
  };

  return (
    <Button onClick={handleClick} type="button" size="fixed">
      新規登録して注文を始める
    </Button>
  );
};

export default TopRegisterButton;
