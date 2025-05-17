import { SetStateAction } from "react";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";
import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch";

type MenuDetailTaxIncludedFieldProps = {
  value: boolean;
  setValue: React.Dispatch<SetStateAction<boolean>>;
};

const MenuDetailTaxIncludedField: React.FC<MenuDetailTaxIncludedFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <MenuDetailItem title="税込表示">
      <ToggleSwitch isChecked={value} onChange={() => setValue(!value)} />
    </MenuDetailItem>
  );
};

export default MenuDetailTaxIncludedField;
