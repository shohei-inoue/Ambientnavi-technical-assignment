"use client";

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const DummyLoginButton = () => {
  const router = useRouter();

  const handleTestLogin = async () => {
    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password1234");
    formData.append("tableNumber", "1"); // QRで渡される想定の値

    const res = await fetch("/api/web/auth/login", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("ログイン失敗: " + data.error);
      return;
    }

    alert("ログイン成功");
    router.push("/menu");
  };

  return (
    <Button onClick={handleTestLogin} type="button" size="fixed">
      テストログイン
    </Button>
  );
};

export default DummyLoginButton;
