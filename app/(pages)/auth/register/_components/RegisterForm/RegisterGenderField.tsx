import { Gender } from "@/app/types/types";
import RegisterItem from "./RegisterItem";
import { SetStateAction } from "react";

type RegisterGenderFieldProps = {
  value: Gender;
  setValue: React.Dispatch<SetStateAction<Gender>>;
};

const RegisterGenderField: React.FC<RegisterGenderFieldProps> = ({ value, setValue }) => {
  return (
    <RegisterItem title="性別">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as Gender)}
        className="w-full p-2 border  rounded"
      >
        <option value="MALE">男性</option>
        <option value="FEMALE">女性</option>
        <option value="OTHER">その他</option>
      </select>
    </RegisterItem>
  );
};

export default RegisterGenderField;
