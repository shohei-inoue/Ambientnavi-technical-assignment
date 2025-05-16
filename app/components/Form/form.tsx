import { ReactNode } from "react";

type FromProps = {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
};

const Form: React.FC<FromProps> = ({ action, children }) => {
  return (
    <form action={action} className="space-y-4 p-4">
      {children}
    </form>
  );
};

export default Form;
