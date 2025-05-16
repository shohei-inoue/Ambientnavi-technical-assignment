import { ReactNode } from "react";

type FromProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children: ReactNode;
};

const Form: React.FC<FromProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      {children}
    </form>
  );
};

export default Form;
