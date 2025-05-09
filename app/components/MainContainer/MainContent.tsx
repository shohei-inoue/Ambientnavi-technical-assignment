type MainContentProps = {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div className="m-4">{children}</div>
}

export default MainContent;