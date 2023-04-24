import Link from "next/link";
import React from "react";
import Logo from "@/components/Logo/Logo";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

const Header = () => {

  return (
    <header>
      <nav className="h-[68px] border-gray-200 bg-blue-500 px-4 dark:bg-gray-900 lg:px-6">
        <div className="m-auto flex h-full max-w-screen-xl flex-wrap items-center justify-between">
          <div className="my-auto flex items-center">
            <Link href={"/"}>
              <Logo />
            </Link>
            <div className="flex lg:hidden">
              <ThemeSwitch />
            </div>
          </div>
          <div className="flex items-center lg:order-2">
            <div className={"my-auto mr-8 hidden h-12 lg:flex"}>
              <div className={"my-auto ml-2"}>
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
