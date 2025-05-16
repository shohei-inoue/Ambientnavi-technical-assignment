import { createMenu } from "@/app/actions/menuActions"
import MenuDetailNameFiled from "../../../[id]/_components/MenuDetailNameField/MenuDetailnameField"
import MenuDetailDescriptionField from "../../../[id]/_components/MenuDetailDescriptionField/MenuDetailDescriptionField"
import MenuDetailPriceField from "../../../[id]/_components/MenuDetailPriceField/MenuDetailPriceField"
import Button from "@/app/components/Button/Button"

const MenuAddForm = () => {
  return (
    <form action={createMenu} className="space-y-4 p-4">
      <MenuDetailNameFiled />
      <MenuDetailDescriptionField />
      <MenuDetailPriceField />
      <Button type="submit">
        登録する
      </Button>
    </form>
  )
}

export default MenuAddForm