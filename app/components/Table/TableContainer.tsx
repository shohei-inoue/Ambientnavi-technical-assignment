import { ReactNode } from "react"

type TableContainerProps = {
  children: ReactNode
}

const TableContainer: React.FC<TableContainerProps> = ({ children }) => {
  return (
    <div
      className="w-full overflow-x-scroll px-4"
    >
      {children}
    </div>
  )
}

export default TableContainer