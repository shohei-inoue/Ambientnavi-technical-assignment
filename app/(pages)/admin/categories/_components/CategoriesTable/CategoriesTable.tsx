import Table from "@/app/components/Table/Table";
import TableBody from "@/app/components/Table/TableBody";
import TableContainer from "@/app/components/Table/TableContainer";
import TableData from "@/app/components/Table/TableData";
import TableHead from "@/app/components/Table/TableHead";
import TableHeader from "@/app/components/Table/TableHeader";
import TableRow from "@/app/components/Table/TableRow";
import { AdminCategoriesData } from "@/app/types/types";

type CategoriesTableProps = {
  categories: AdminCategoriesData[];
};

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeader>ID</TableHeader>
          <TableHeader>カテゴリ名</TableHeader>
          <TableHeader>メニュー数</TableHeader>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              href={`/admin/categories/` + category.id}
              clickable={true}
            >
              <TableData>{category.id}</TableData>
              <TableData>{category.name}</TableData>
              <TableData>{category._count.menus}個</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
