'use client';

import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "../LoginForm/LoginForm";
import Button from "@/app/components/Button/Button";

const LoginContents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get("table_number");

  const handleRegisterClick = () => {
    const redirectUrl = tableNumber
      ? `/auth/register?table_number=${tableNumber}`
      : "/auth/register";
    router.push(redirectUrl);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <LoginForm />
      <Button onClick={handleRegisterClick} size="fixed">
        新規登録はこちら
      </Button>
    </div>
  );
};

export default LoginContents;