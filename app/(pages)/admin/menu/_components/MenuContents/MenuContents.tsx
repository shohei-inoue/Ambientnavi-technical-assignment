import { handleGetMenu } from "@/app/actions/admin/menu/controller/MenuController";
import MenuTable from "../MenuTable/MenuTable";

const MenuContents = async () => {
  const menu = await handleGetMenu();
  return (
    <>
      <MenuTable menu={menu} />
    </>
  );
};

export default MenuContents;
