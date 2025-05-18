import { getMenu } from "@/app/actions/admin/menuActions";
import MenuTable from "../MenuTable/MenuTable";

const MenuContents = async () => {
  const menu = await getMenu();
  return (
    <>
      <MenuTable menu={menu} />
    </>
  );
};

export default MenuContents;
