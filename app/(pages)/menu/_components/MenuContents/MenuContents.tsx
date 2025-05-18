import Heading from "@/app/components/Heading/Heading";
import MenuHeadNav from "../MenuNav/MenuHeadNav";
import MenuContent from "../MenuContent/MenuContent";
import MenuBottomNav from "../MenuNav/MenuBottomNav";
import { getCategories } from "@/app/actions/web/categoriesActions";

const MenuContents = async () => {
  const categories = await getCategories()
  return (
    <div>
      <MenuHeadNav categories={categories}/>
      <Heading level={1}>Menu</Heading>
      <MenuContent />
      <MenuContent />
      <MenuContent />
      <MenuContent />
      <MenuBottomNav />
    </div>
  );
};

export default MenuContents;
