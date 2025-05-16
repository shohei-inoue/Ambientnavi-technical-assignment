import { ReactNode } from "react";

type TableHeadProps = {
  children: ReactNode;
};

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <thead className="px-4 py-2 white-space-nowrap border-b-2 border-gray-200 bg-gray-100">
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHead;
