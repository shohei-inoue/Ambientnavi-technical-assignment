"use client";

import { useState } from "react";
import LoginMailField from "./LoginMailField";
import Button from "@/app/components/Button/Button";
import LoginPasswordField from "./LoginPasswordField";

const LoginForm = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form action="" className="flex flex-col gap-4 items-center w-full">
      <LoginMailField title="メールアドレス" value={mail} setValue={setMail} />
      <LoginPasswordField
        title="パスワード"
        value={password}
        setValue={setPassword}
      />
      <Button type="submit" size="fixed">
        ログイン
      </Button>
    </form>
  );
};

export default LoginForm;
