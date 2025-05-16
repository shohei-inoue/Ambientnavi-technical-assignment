import CategoryItem from "../CategoryItem/CategoryItem";

const CategoryNameFiled = () => {
  return (
    <CategoryItem title="カテゴリー名">
      <input type="text" name="name" placeholder="カテゴリー名" />
    </CategoryItem>
  );
};

export default CategoryNameFiled;
