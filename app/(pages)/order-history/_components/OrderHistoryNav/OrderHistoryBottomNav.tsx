const OrderHistoryBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-between p-4 shadow">
      <div className="items-center flex flex-col">
        <span className="material-symbols-rounded">menu_book</span>
        <p>メニューに戻る</p>
      </div>
      <button className="bg-gray-500 text-white py-2 px-4 rounded">
        注文する
      </button>
    </nav>
  );
};

export default OrderHistoryBottomNav;
