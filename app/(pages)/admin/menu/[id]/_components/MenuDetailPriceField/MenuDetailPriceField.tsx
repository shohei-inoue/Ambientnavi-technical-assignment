import { SetStateAction } from "react";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";

type MenuDetailPriceFieldProps = {
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
};

const MenuDetailPriceField: React.FC<MenuDetailPriceFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <MenuDetailItem title="価格">
      <input
        type="number"
        name="price"
        placeholder="価格"
        value={value}
        min={0}
        onChange={(e) => setValue(Number(e.target.value))}
        className="border p-2 w-full rounded"
      />
    </MenuDetailItem>
  );
};

export default MenuDetailPriceField;
