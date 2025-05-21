"use client";

import Input from "@/app/components/Input/Input";
import { useState } from "react";
import AdminLoginItem from "./AdminLoginItem";

type AdminLoginPasswordFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminLoginPasswordField: React.FC<AdminLoginPasswordFieldProps> = ({
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
    <AdminLoginItem title={title}>
      <Input
        type="password"
        placeholder="パスワード"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
        minLength={8}
        maxLength={20}
        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$"
      />
      {isError && (
        <p className="text-red-500">
          パスワードは8文字以上20文字以下で、英字と数字を含む必要があります。
        </p>
      )}
    </AdminLoginItem>
  );
};

export default AdminLoginPasswordField;
