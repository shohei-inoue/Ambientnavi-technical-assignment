import MenuDetailItem from "../MenuDetailItem/MenuDetailItem"

const MenuDetailNameFiled = () => {
  return (
    <MenuDetailItem title="商品名">
      <input type="text" name="name" placeholder="商品名"/>
    </MenuDetailItem>
  )
}

export default MenuDetailNameFiled