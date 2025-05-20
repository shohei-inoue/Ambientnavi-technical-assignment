"use client";

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const TopLoginButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <Button onClick={handleClick} type="button" size="fixed">
      ログインして注文を始める
    </Button>
  );
};

export default TopLoginButton;
