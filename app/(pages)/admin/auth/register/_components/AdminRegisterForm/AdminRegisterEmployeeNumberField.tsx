"use client";

import Input from "@/app/components/Input/Input";
import { useState } from "react";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterEmployeeNumberFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRegisterEmployeeNumberField: React.FC<
  AdminRegisterEmployeeNumberFieldProps
> = ({ title, value, setValue }) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <AdminRegisterItem title={title}>
      <Input
        type="text"
        placeholder="社員番号"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && <p className="text-red-500">社員番号を入力してください。</p>}
    </AdminRegisterItem>
  );
};

export default AdminRegisterEmployeeNumberField;
