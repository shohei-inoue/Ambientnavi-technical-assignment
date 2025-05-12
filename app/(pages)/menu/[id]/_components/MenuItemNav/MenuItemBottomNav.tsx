const MenuItemBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-between items-center p-4 shadow">
      <button className="bg-gray-500 py-2 px-4 rounded text-white">
        カートに追加
      </button>
      <button className="bg-gray-900 py-2 px-4 rounded text-white">
        注文確定
      </button>
    </nav>
  );
};

export default MenuItemBottomNav;
