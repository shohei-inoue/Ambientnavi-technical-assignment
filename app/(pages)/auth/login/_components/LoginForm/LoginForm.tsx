"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginMailField from "./LoginMailField";
import Button from "@/app/components/Button/Button";
import LoginPasswordField from "./LoginPasswordField";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/menu";

  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tableNumber = searchParams.get("table_number");
    
    const formData = new FormData();
    formData.append("email", mail);
    formData.append("password", password);
    formData.append("tableNumber", tableNumber || "");

    try {
      const res = await fetch("/api/web/auth/login", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "ログインに失敗しました");
      }

      alert("ログイン成功しました");
      router.push(redirectPath); // ログイン後にトップへ
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full"
    >
      <LoginMailField title="メールアドレス" value={mail} setValue={setMail} />
      <LoginPasswordField
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

export default LoginForm;
