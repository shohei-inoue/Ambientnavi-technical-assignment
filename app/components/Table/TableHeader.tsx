import { ReactNode } from "react";

type TableHeadProps = {
  children: ReactNode;
};

const TableHeader: React.FC<TableHeadProps> = ({ children }) => {
  return <th className="px-4 py-2">{children}</th>;
};

export default TableHeader;
