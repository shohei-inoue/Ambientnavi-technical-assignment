import Input from "@/app/components/Input/Input";
import LoginItem from "./LoginItem";
import { useState } from "react";

type LoginMailFieldProps = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const LoginMailField: React.FC<LoginMailFieldProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleValidate = () => {
    setIsError(!value);
  };

  return (
    <LoginItem title={title}>
      <Input
        type="email"
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleValidate}
        required
      />
      {isError && (
        <p className="text-red-500">メールアドレスを入力してください</p>
      )}
    </LoginItem>
  );
};

export default LoginMailField;
