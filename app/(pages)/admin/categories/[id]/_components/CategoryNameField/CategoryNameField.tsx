import { SetStateAction } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";

type CategoryNameFieldProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
};

const CategoryNameFiled: React.FC<CategoryNameFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <CategoryItem title="カテゴリー名">
      <input
        type="text"
        name="name"
        placeholder="カテゴリー名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </CategoryItem>
  );
};

export default CategoryNameFiled;
