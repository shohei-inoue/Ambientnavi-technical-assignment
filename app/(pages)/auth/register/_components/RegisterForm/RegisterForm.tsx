"use client";

import Button from "@/app/components/Button/Button";
import RegisterNameField from "./RegisterNameField";
import { useState } from "react";
import RegisterBirthdayField from "./RegisterBirthdayField";
import RegisterMailField from "./RegisterMailField";
import RegisterPasswordField from "./RegisterPasswordField";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="flex flex-col gap-4 items-center w-full">
      <RegisterNameField title="氏名" value={name} setValue={setName} />
      <RegisterBirthdayField
        title="生年月日"
        value={birthday}
        setValue={setBirthday}
      />
      <RegisterMailField
        title="メールアドレス"
        value={mail}
        setValue={setMail}
      />
      <RegisterPasswordField
        title="パスワード"
        value={password}
        setValue={setPassword}
      />
      <Button type="submit" size="fixed">
        登録
      </Button>
    </form>
  );
};

export default RegisterForm;
