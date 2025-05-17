// app/components/Loader/Loader.tsx
"use client";

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
