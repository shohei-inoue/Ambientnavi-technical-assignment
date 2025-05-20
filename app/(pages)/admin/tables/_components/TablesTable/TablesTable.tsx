import Table from "@/app/components/Table/Table";
import { Table as TableType } from "@/app/actions/admin/table/domain/Table";
import TableBody from "@/app/components/Table/TableBody";
import TableContainer from "@/app/components/Table/TableContainer";
import TableData from "@/app/components/Table/TableData";
import TableHead from "@/app/components/Table/TableHead";
import TableHeader from "@/app/components/Table/TableHeader";
import TableRow from "@/app/components/Table/TableRow";

type TablesTableProps = {
  tables: TableType[];
};

const TablesTable: React.FC<TablesTableProps> = ({ tables }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeader>ID</TableHeader>
          <TableHeader>テーブル番号</TableHeader>
          <TableHeader>利用可能</TableHeader>
        </TableHead>
        <TableBody>
          {tables.map((table) => (
            <TableRow
              key={table.id}
              href={`/admin/tables/` + table.id}
              clickable={true}
            >
              <TableData>{table.id}</TableData>
              <TableData>{table.number}</TableData>
              <TableData>{table.isAvailable ? "○" : "✖️"}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablesTable;
