"use client";

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const LoginButtonContents = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/auth/register");
  };

  const handleForgotPasswordClick = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <div className="flex gap-4 items-center w-full cursor-pointer">
      <Button onClick={handleRegisterClick} size="fixed">
        アカウントをお持ちでない方はこちら
      </Button>
      <Button onClick={handleForgotPasswordClick} size="fixed">
        パスワードを忘れた方はこちら
      </Button>
    </div>
  );
};

export default LoginButtonContents;
