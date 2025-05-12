import Table from "@/app/components/Table/Table";
import TableBody from "@/app/components/Table/TableBody";
import TableContainer from "@/app/components/Table/TableContainer";
import TableData from "@/app/components/Table/TableData";
import TableHead from "@/app/components/Table/TableHead";
import TableHeader from "@/app/components/Table/TableHeader";
import TableRow from "@/app/components/Table/TableRow";

const MenuTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeader>ID</TableHeader>
          <TableHeader>メニュー名</TableHeader>
          <TableHeader>種類</TableHeader>
          <TableHeader>価格</TableHeader>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>1</TableData>
            <TableData>カレー</TableData>
            <TableData>食事</TableData>
            <TableData>1000</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuTable;
