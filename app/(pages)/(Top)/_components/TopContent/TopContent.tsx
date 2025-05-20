import EntryForm from "../EntryForm/EntryForm";

type TopContentProps = {
  tableNumber: number;
};

const TopContent: React.FC<TopContentProps> = ({ tableNumber }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">居酒屋3900へようこそ!</h1>
      <p className="mt-4 text-lg">
        居酒屋3900をご利用いただきありがとうございます。
      </p>
      <p>ご利用人数を入力してください。</p>
      <EntryForm tableNumber={tableNumber} />
    </div>
  );
};

export default TopContent;
