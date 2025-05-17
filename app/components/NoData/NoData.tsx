"use client";

type NoDataProps = {
  message?: string;
};

const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <div className="p-4 text-gray-500 text-center">
      {message ?? "データが見つかりませんでした。"}
    </div>
  );
};

export default NoData;
