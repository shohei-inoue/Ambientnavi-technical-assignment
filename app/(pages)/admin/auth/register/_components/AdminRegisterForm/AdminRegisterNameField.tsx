"use client";

import { useState } from "react";
import Input from "@/app/components/Input/Input";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterNameFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRegisterNameField: React.FC<AdminRegisterNameFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <AdminRegisterItem title={title}>
      <Input
        type="text"
        placeholder="氏 名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && <p className="text-red-500">氏名を入力してください</p>}
    </AdminRegisterItem>
  );
};

export default AdminRegisterNameField;
