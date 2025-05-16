import { CreateCategory } from "@/app/actions/categoriesActions";
import Form from "@/app/components/Form/form";
import CategoryNameFiled from "../../../[id]/_components/CategoryNameField/CategoryNameField";
import Button from "@/app/components/Button/Button";

const CategoriesAddForm = () => {
  return (
    <Form action={CreateCategory}>
      <CategoryNameFiled />
      <Button type="submit">追加する</Button>
    </Form>
  );
};

export default CategoriesAddForm;
