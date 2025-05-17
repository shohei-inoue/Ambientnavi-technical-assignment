"use client";

type ErrorProps = {
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>{message ?? "予期せぬエラーが発生しました。"}</p>
    </div>
  );
};

export default Error;
