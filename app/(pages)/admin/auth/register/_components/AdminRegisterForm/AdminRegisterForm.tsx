"use client";

import { Gender } from "@/app/actions/admin/auth/domain/User";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminRegisterNameField from "./AdminRegisterNameField";
import AdminRegisterGenderField from "./AdminRegisterGenderField";
import AdminRegisterBirthdayField from "./AdminRegisterBirthdayField";
import AdminRegisterMailField from "./AdminRegisterMailField";
import AdminRegisterPasswordField from "./AdminRegisterPasswordField";
import AdminRegisterEmployeeNumberField from "./AdminRegisterEmployeeNumberField";
import Button from "@/app/components/Button/Button";
import { handleAdminRegister } from "@/app/actions/admin/auth/controller/registerController";

const AdminRegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<Gender>("MALE");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", mail);
    formData.append("password", password);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("employeeNumber", employeeNumber);

    try {
      const result = await handleAdminRegister(formData);

      if (!result.success) {
        alert(`登録に失敗しました: ${result.error}`);
        return;
      }

      alert(result.message);
      router.push("/admin/auth/login");
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
      <AdminRegisterNameField title="氏名" value={name} setValue={setName} />
      <AdminRegisterGenderField value={gender} setValue={setGender} />
      <AdminRegisterBirthdayField
        title="生年月日"
        value={birthday}
        setValue={setBirthday}
      />
      <AdminRegisterMailField
        title="メールアドレス"
        value={mail}
        setValue={setMail}
      />
      <AdminRegisterEmployeeNumberField
        title="社員番号"
        value={employeeNumber}
        setValue={setEmployeeNumber}
      />
      <AdminRegisterPasswordField
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

export default AdminRegisterForm;
