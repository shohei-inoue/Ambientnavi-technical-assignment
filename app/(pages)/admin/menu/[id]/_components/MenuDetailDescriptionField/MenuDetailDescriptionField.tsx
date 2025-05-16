import MenuDetailItem from "../MenuDetailItem/MenuDetailItem"

const MenuDetailDescriptionField = () => {
  return (
    <MenuDetailItem title="商品説明">
      <textarea name="description" placeholder="商品説明" />
    </MenuDetailItem>
  )
}

export default MenuDetailDescriptionField