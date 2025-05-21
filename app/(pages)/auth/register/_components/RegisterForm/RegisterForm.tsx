"use client";

import Button from "@/app/components/Button/Button";
import RegisterNameField from "./RegisterNameField";
import RegisterBirthdayField from "./RegisterBirthdayField";
import RegisterMailField from "./RegisterMailField";
import RegisterPasswordField from "./RegisterPasswordField";
import RegisterGenderField from "./RegisterGenderField";
import { Gender } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterFormProps = {
  tableNumber: number;
};

const RegisterForm = ({ tableNumber }: RegisterFormProps) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<Gender>("MALE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", mail);
    formData.append("password", password);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    if (tableNumber) formData.append("tableNumber", tableNumber.toString());

    try {
      const res = await fetch("/api/web/auth/signup", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "登録に失敗しました");
      }

      const _result = await res.json();
      alert("登録が完了しました");
      if (tableNumber) {
        router.push(`/auth/login?table_number=${tableNumber}`);
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      alert(`登録に失敗しました: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full"
    >
      <RegisterNameField title="氏名" value={name} setValue={setName} />
      <RegisterGenderField value={gender} setValue={setGender} />
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
