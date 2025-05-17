import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";
import { SetStateAction } from "react";

type MenuDetailIsAvailableFieldProps = {
  value: boolean;
  setValue: React.Dispatch<SetStateAction<boolean>>;
};

const MenuDetailIsAvailableField: React.FC<MenuDetailIsAvailableFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <MenuDetailItem title="提供可能">
      <ToggleSwitch isChecked={value} onChange={() => setValue(!value)} />
    </MenuDetailItem>
  );
};

export default MenuDetailIsAvailableField;
