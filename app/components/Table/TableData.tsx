import { ReactNode } from "react";

type TableDataProps = {
  children: ReactNode;
};

const TableData: React.FC<TableDataProps> = ({ children }) => {
  return <td className="px-4 py-2 hover:text-decoration-none">{children}</td>;
};

export default TableData;
