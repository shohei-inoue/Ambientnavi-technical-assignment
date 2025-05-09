import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type MainContainerProps = {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainContainer;