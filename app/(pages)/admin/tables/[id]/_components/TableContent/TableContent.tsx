"use client";

import TableSettingForm from "./TableSettingForm";
import { Table } from "@/app/actions/admin/table/domain/Table";

type TableContentProps = {
  table: Table;
};

const TableContent: React.FC<TableContentProps> = ({ table }) => {
  return (
    <TableSettingForm
      id={table.id}
      tableNumber={table.number}
      tableIsAvailable={table.isAvailable}
    />
  );
};

export default TableContent;