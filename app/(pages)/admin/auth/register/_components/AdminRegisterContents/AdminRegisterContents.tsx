"use client";

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import AdminRegisterForm from "../AdminRegisterForm/AdminRegisterForm";

const AdminRegisterContents = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push(`/admin/auth/login`);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <AdminRegisterForm />
      <Button onClick={handleLoginClick} size="fixed">
        すでに管理者アカウントをお持ちの方はこちら
      </Button>
    </div>
  );
};

export default AdminRegisterContents;
