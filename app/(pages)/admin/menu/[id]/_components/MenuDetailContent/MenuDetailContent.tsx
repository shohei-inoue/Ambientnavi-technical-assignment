import MenuDetailSettingForm from "./MenuDetailSettingForm";
import { Menu } from "@/app/actions/admin/menu/domain/Menu";

type MenuDetailContentProps = {
  menuDetail: Menu;
};

const MenuDetailContent: React.FC<MenuDetailContentProps> = ({
  menuDetail,
}) => {
  const menuTagNames = menuDetail.tags.map((tag) => tag.name)
  return (
    <MenuDetailSettingForm
      id={menuDetail.id}
      menu_name={menuDetail.name}
      menu_description={menuDetail.description}
      menu_price={menuDetail.price}
      menu_image_url={menuDetail.imageUrl ? menuDetail.imageUrl : ''}
      menu_sub_category_id={menuDetail.subCategory.id}
      menu_is_available={menuDetail.isAvailable}
      menu_tags={menuTagNames}
      menu_tax_included={menuDetail.taxIncluded}
    />
  );
};

export default MenuDetailContent;
