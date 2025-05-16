import MenuDetailItem from "../MenuDetailItem/MenuDetailItem"

const MenuDetailPriceField = () => {
  return (
    <MenuDetailItem title="価格">
      <input type="number" name="price" placeholder="価格"/>
    </MenuDetailItem>
  )
}

export default MenuDetailPriceField