'use client'

import { useRouter } from "next/navigation";
import LoginForm from "../LoginForm/LoginForm";
import Button from "@/app/components/Button/Button";

const LoginContents = () => {
  const router = useRouter()

  const handleRegisterClick = () => {
    router.push("/auth/register");
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
