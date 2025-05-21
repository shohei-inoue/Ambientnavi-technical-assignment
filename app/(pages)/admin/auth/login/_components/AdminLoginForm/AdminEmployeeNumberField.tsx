"use client";

import Input from "@/app/components/Input/Input";
import { useState } from "react";
import AdminLoginItem from "./AdminLoginItem";

type AdminLoginEmployeeNumberFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminLoginEmployeeNumberField: React.FC<
  AdminLoginEmployeeNumberFieldProps
> = ({ title, value, setValue }) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <AdminLoginItem title={title}>
      <Input
        type="text"
        placeholder="社員番号"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && <p className="text-red-500">社員番号を入力してください。</p>}
    </AdminLoginItem>
  );
};

export default AdminLoginEmployeeNumberField;
