import { handleGetTables } from "@/app/actions/admin/table/controller/TableController";
import TablesTable from "../TablesTable/TablesTable";

const TablesContents = async () => {
  const tables = await handleGetTables();

  return <TablesTable tables={tables} />;
};

export default TablesContents;
