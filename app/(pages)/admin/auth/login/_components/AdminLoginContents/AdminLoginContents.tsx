"use client";

import Button from "@/app/components/Button/Button";
import AdminLoginForm from "../AdminLoginForm/AdminLoginForm";
import { useRouter } from "next/navigation";

const AdminLoginContents = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push("/admin/auth/register");
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <AdminLoginForm />
      <Button onClick={handleRegisterClick} size="fixed">
        新規登録はこちら
      </Button>
    </div>
  );
};

export default AdminLoginContents;
