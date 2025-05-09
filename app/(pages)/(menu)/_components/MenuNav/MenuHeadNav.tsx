import MenuItem from "./MenuHeadNavItem";

type MenuNavData = {
  title: string;
  id: string;
}

const MenuNavDataList: MenuNavData[] = [
  {
    title: "おすすめ",
    id: "recommend",
  },
  {
    title: "フード",
    id: "food",
  },
  {
    title: "ドリンク",
    id: "drink",
  },
  {
    title: "デザート",
    id: "dessert",
  },
  {
    title: "サイドメニュー",
    id: "sideMenu",
  },
]

const MenuHeadNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
      <ul className="flex justify-around bg-gray-100 p-4">
        {MenuNavDataList.map((item) => (
          <MenuItem key={item.id} title={item.title} id={item.id}/>
        ))}
      </ul>
    </nav>
  )
}

export default MenuHeadNav