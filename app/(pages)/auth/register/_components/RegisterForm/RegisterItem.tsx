type RegisterItemProps = {
  title: string;
  children: React.ReactNode;
};

const RegisterItem: React.FC<RegisterItemProps> = ({ title, children }) => {
  return (
    <div className="flex md:block py-6 w-full md:w-[400px] gap-4 md:gap-0 items-center">
      <h2 className="flex-shrink-0 w-full max-w-[160px] text-base md:pb-6">
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default RegisterItem;
