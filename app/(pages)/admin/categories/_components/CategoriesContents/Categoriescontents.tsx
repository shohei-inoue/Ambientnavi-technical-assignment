import { getCategories } from "@/app/actions/categoriesActions"
import CategoriesTable from "../CategoriesTable/CategoriesTable"

const CategoriesContents = async () => {
  const categories = await getCategories()
  return (
    <>
      <CategoriesTable categories={categories}/>
    </>
  )
}

export default CategoriesContents