"use client";

import Button from "@/app/components/Button/Button";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useRouter } from "next/navigation";

type RegisterContentsProps = {
  tableNumber: number;
};

const RegisterContents: React.FC<RegisterContentsProps> = ({ tableNumber }) => {
  const router = useRouter();

  const handleLoginClick = () => {
    const query = tableNumber ? `?table_number=${tableNumber}` : "";
    router.push(`/auth/login${query}`);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <RegisterForm tableNumber={tableNumber} />
      <Button onClick={handleLoginClick} size="fixed">
        すでにアカウントをお持ちの方はこちら
      </Button>
    </div>
  );
};

export default RegisterContents;
