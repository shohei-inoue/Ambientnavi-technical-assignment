"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  clickable?: boolean;
  href?: string;
};

const TableRow: React.FC<TableRowProps> = ({ children, clickable, href }) => {
  const router = useRouter();

  const handleClick = () => {
    if (clickable && href) {
      router.push(href);
    }
  };

  return (
    <tr
      className="border-b-1 border-solid border-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </tr>
  );
};

export default TableRow;
