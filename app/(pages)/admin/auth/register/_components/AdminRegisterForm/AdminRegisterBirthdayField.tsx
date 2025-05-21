"use client";

import { useState } from "react";
import Input from "@/app/components/Input/Input";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterBirthdayFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const AdminRegisterBirthdayField: React.FC<AdminRegisterBirthdayFieldProps> = ({
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
        type="date"
        placeholder="YYYY/MM/DD"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && (
        <p className="text-red-500">生年月日を正しい形式で入力してください</p>
      )}
    </AdminRegisterItem>
  );
};

export default AdminRegisterBirthdayField;
