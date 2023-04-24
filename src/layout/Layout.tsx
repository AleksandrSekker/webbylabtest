import {ReactNode} from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

interface ILayoutProp {
    children: ReactNode;
}

const Layout = ({ children }: ILayoutProp) => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white dark:bg-gray-800">
      <Header />
      <main className="m-auto w-full max-w-screen-xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
