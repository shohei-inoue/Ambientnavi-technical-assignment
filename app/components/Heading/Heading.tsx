import { createElement, ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6; // タイトルレベル
};

const Heading: React.FC<HeadingProps> = ({ children, level }) => {
  return createElement(
    `h${level}`,
    {
      className: `text-${level}xl font-bold text-gray-800 m-4`,
      id: `heading-${level}`,
    },
    children
  );
};

export default Heading;
