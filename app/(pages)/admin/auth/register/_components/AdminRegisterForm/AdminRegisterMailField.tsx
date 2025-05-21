"use client";

import Input from "@/app/components/Input/Input";
import { useState } from "react";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterMailFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRegisterMailField: React.FC<AdminRegisterMailFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsError(!emailPattern.test(value));
  };

  return (
    <AdminRegisterItem title={title}>
      <Input
        type="email"
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && (
        <p className="text-red-500">
          メールアドレスを正しい形式で入力してください
        </p>
      )}
    </AdminRegisterItem>
  );
};

export default AdminRegisterMailField;
