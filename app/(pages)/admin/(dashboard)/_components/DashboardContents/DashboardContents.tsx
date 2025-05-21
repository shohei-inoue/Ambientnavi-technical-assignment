const DashboardContents = () => {
  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">今日の売上: ¥12,000</div>
          <div className="p-4 bg-white rounded shadow">注文数: 24件</div>
          <div className="p-4 bg-white rounded shadow">人気商品: 唐揚げ</div>
        </div>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">最新の注文</h2>
          {/* 注文リストなどをここに */}
        </section>
      </main>
    </div>
  );
};

export default DashboardContents;
