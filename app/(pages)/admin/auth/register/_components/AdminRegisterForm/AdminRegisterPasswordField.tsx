"use client";

import Input from "@/app/components/Input/Input";
import { useState } from "react";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterPasswordFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRegisterPasswordField: React.FC<AdminRegisterPasswordFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    setIsError(!passwordPattern.test(value));
  };

  return (
    <AdminRegisterItem title={title}>
      <Input
        type="password"
        placeholder="パスワード"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        minLength={8}
        maxLength={20}
        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$"
        onBlur={handleValidate}
      />
      {isError && (
        <p className="text-red-500">
          パスワードは8文字以上20文字以下で、英字と数字を含む必要があります。
        </p>
      )}
    </AdminRegisterItem>
  );
};

export default AdminRegisterPasswordField;
