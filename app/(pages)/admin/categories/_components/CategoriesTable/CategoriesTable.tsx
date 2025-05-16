import Table from "@/app/components/Table/Table"
import TableBody from "@/app/components/Table/TableBody"
import TableContainer from "@/app/components/Table/TableContainer"
import TableData from "@/app/components/Table/TableData"
import TableHead from "@/app/components/Table/TableHead"
import TableHeader from "@/app/components/Table/TableHeader"
import TableRow from "@/app/components/Table/TableRow"

const CategoriesTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeader>ID</TableHeader>
          <TableHeader>カテゴリ名</TableHeader>
          <TableHeader>メニュー数</TableHeader>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>1</TableData>
            <TableData>ドリンク</TableData>
            <TableData>10</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoriesTable