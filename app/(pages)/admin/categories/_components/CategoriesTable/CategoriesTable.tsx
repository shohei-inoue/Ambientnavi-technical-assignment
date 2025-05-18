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
          <TableHeader>サブカテゴリ数</TableHeader>
          <TableHeader>メニュー総数</TableHeader>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            const subCategoryCount = category.subCategories.length;
            const menuTotalCount = category.subCategories.reduce(
              (sum, sub) => sum + sub._count.menus,
              0
            );
            return (
              <TableRow
                key={category.id}
                href={`/admin/categories/${category.id}`}
                clickable={true}
              >
                <TableData>{category.id}</TableData>
                <TableData>{category.name}</TableData>
                <TableData>{subCategoryCount}件</TableData>
                <TableData>{menuTotalCount}件</TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
