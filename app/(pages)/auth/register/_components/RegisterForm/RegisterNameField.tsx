"use client";

import { useState } from "react";
import RegisterItem from "./RegisterItem";
import Input from "@/app/components/Input/Input";

type RegisterNameFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const RegisterNameField: React.FC<RegisterNameFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <RegisterItem title={title}>
      <Input
        type="text"
        placeholder="氏 名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && <p className="text-red-500">氏名を入力してください</p>}
    </RegisterItem>
  );
};

export default RegisterNameField;
