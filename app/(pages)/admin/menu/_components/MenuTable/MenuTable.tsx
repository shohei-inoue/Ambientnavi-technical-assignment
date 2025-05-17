import Table from "@/app/components/Table/Table";
import TableBody from "@/app/components/Table/TableBody";
import TableContainer from "@/app/components/Table/TableContainer";
import TableData from "@/app/components/Table/TableData";
import TableHead from "@/app/components/Table/TableHead";
import TableHeader from "@/app/components/Table/TableHeader";
import TableRow from "@/app/components/Table/TableRow";
import { MenuData } from "@/app/types/types";

type MenuTableProps = {
  menu: MenuData[]
}

const MenuTable: React.FC<MenuTableProps> = ({ menu }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeader>ID</TableHeader>
          <TableHeader>メニュー名</TableHeader>
          <TableHeader>価格</TableHeader>
        </TableHead>
        <TableBody>
          {menu.map((menuDetail) => (
            <TableRow
              key={menuDetail.id}
              href={`/admin/menu/` + menuDetail.id}
              clickable={true}
            >
            <TableData>{menuDetail.id}</TableData>
            <TableData>{menuDetail.name}</TableData>
            <TableData>{menuDetail.price}</TableData>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuTable;
