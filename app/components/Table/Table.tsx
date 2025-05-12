import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
};

const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <table className="border-collapse w-full min-w-[800px] text-left">
      {children}
    </table>
  );
};

export default Table;
