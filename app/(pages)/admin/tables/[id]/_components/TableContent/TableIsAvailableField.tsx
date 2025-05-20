import { SetStateAction } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch/ToggleSwitch";
import TableItem from "./TableItem";

type TableIsAvailableFieldProps = {
  value: boolean;
  setValue: React.Dispatch<SetStateAction<boolean>>;
};

const TableIsAvailableField: React.FC<TableIsAvailableFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <TableItem title="利用可能">
      <ToggleSwitch isChecked={value} onChange={() => setValue(!value)} />
    </TableItem>
  );
};

export default TableIsAvailableField;
