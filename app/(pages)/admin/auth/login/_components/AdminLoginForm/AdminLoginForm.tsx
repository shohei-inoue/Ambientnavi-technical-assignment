"use client";

import { useState } from "react";
import AdminLoginEmployeeNumberField from "./AdminEmployeeNumberField";
import AdminLoginPasswordField from "./AdminLoginPasswordField";
import Button from "@/app/components/Button/Button";
import { handleAdminLogin } from "@/app/actions/admin/auth/controller/loginController";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeNumber", employeeNumber);
    formData.append("password", password);

    try {
      const result = await handleAdminLogin(formData);
      if (!result.success) {
        setError(result.error || "ログインに失敗しました");
        return;
      }

      alert("ログイン成功しました");
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setError("予期せぬエラーが発生しました");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full"
    >
      <AdminLoginEmployeeNumberField
        title="社員番号"
        value={employeeNumber}
        setValue={setEmployeeNumber}
      />
      <AdminLoginPasswordField
        title="パスワード"
        value={password}
        setValue={setPassword}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" size="fixed">
        ログイン
      </Button>
    </form>
  );
};

export default AdminLoginForm;
