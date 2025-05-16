import Heading from "@/app/components/Heading/Heading";
import MenuHeadNav from "../MenuNav/MenuHeadNav";
import MenuContent from "../MenuContent/MenuContent";
import MenuBottomNav from "../MenuNav/MenuBottomNav";

const MenuContents = () => {
  return (
    <div>
      <MenuHeadNav />
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
