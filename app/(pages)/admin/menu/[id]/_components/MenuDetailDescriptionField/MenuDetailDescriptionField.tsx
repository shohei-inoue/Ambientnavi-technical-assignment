import { SetStateAction } from "react";
import MenuDetailItem from "../MenuDetailItem/MenuDetailItem";

type MenuDetailDescriptionFieldProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
};

const MenuDetailDescriptionField: React.FC<MenuDetailDescriptionFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <MenuDetailItem title="商品説明">
      <textarea
        name="description"
        placeholder="商品の説明を記述してください"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 w-full rounded"
      />
    </MenuDetailItem>
  );
};

export default MenuDetailDescriptionField;
