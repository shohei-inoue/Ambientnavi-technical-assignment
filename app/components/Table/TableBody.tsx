import { ReactNode } from "react";

type TableBodyProps = {
  children: ReactNode;
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="px-4 py-2 white-space-nowrap">{children}</tbody>;
};

export default TableBody;
