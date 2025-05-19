"use client";

import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";

const DummyLoginButton = () => {
  const router = useRouter();

  const handleTestLogin = async () => {
    const res = await fetch("/api/web/session", {
      method: "POST",
      body: JSON.stringify({
        tableNumber: 1, // 仮のテーブル番号
        userId: 1,      // 仮のログイン済みユーザーID
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.redirect) {
      router.push(data.redirect);
    } else {
      alert("セッション開始: " + data.sessionId);
      router.push("/menu");
    }
  };

  return (
    <Button onClick={handleTestLogin} type="button" size="fixed">
      テストログイン
    </Button>
  );
};

export default DummyLoginButton;