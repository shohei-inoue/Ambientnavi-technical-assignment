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
import { handleSignup } from "@/app/actions/web/auth/controller/SignupController";

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

    try {
      const result = await handleSignup(formData);

      if (!result.success) {
        alert(`登録に失敗しました: ${result.error}`);
        return;
      }

      alert(result.message);
      router.push(
        tableNumber ? `/auth/login?table_number=${tableNumber}` : "/auth/login"
      );
    } catch (error) {
      console.error(error)
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
