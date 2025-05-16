import { createMenu } from "@/app/actions/menuActions";
import MenuDetailNameFiled from "../../../[id]/_components/MenuDetailNameField/MenuDetailnameField";
import MenuDetailDescriptionField from "../../../[id]/_components/MenuDetailDescriptionField/MenuDetailDescriptionField";
import MenuDetailPriceField from "../../../[id]/_components/MenuDetailPriceField/MenuDetailPriceField";
import Button from "@/app/components/Button/Button";
import Form from "@/app/components/Form/form";

const MenuAddForm = () => {
  return (
    <Form action={createMenu}>
      <MenuDetailNameFiled />
      <MenuDetailDescriptionField />
      <MenuDetailPriceField />
      <Button type="submit">登録する</Button>
    </Form>
  );
};

export default MenuAddForm;
