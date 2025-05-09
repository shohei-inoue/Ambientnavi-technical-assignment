const MenuBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-between items-center p-4 shadow">
      <div className="items-center flex flex-col">
        <span className="material-symbols-rounded">
          receipt_long
        </span>
        <p>注文履歴</p>
      </div>
      <button className="bg-gray-500 py-2 px-4 rounded text-white">
        カートを確認
      </button>
    </nav>
  )
}

export default MenuBottomNav