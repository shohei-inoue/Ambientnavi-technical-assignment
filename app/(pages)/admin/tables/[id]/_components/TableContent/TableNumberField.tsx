import { SetStateAction } from "react";
import TableItem from "./TableItem";

type TableNumberFieldProps = {
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
};

const TableNumberField: React.FC<TableNumberFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <TableItem title="テーブル番号">
      <input
        type="number"
        name="table"
        placeholder="価格"
        value={value}
        min={1}
        onChange={(e) => setValue(Number(e.target.value))}
        className="border p-2 w-full rounded"
        required
      />
    </TableItem>
  );
};

export default TableNumberField;
