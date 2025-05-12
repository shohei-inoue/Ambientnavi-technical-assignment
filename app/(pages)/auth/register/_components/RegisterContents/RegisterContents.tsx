"use client";

import Button from "@/app/components/Button/Button";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useRouter } from "next/navigation";

const RegisterContents = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <RegisterForm />
      <Button onClick={handleLoginClick} size="fixed">
        すでにアカウントをお持ちの方はこちら
      </Button>
    </div>
  );
};

export default RegisterContents;
