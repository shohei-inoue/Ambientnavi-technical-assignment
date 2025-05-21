import { Gender } from "@/app/actions/admin/auth/domain/User";
import { SetStateAction } from "react";
import AdminRegisterItem from "./AdminRegisterItem";

type AdminRegisterGenderFieldProps = {
  value: Gender;
  setValue: React.Dispatch<SetStateAction<Gender>>;
};

const AdminRegisterGenderField: React.FC<AdminRegisterGenderFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <AdminRegisterItem title="性別">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as Gender)}
        className="w-full p-2 border  rounded"
      >
        <option value="MALE">男性</option>
        <option value="FEMALE">女性</option>
        <option value="OTHER">その他</option>
      </select>
    </AdminRegisterItem>
  );
};

export default AdminRegisterGenderField;
