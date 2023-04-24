import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { links } from "@/constants/general";
const Footer = () => {
  return (
    <footer className="bg-pinkHeader bg-blue-500 p-4 dark:bg-gray-900 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between"></div>
        <div className="text-center sm:flex sm:items-center sm:justify-between">
          <span className="w-100 order-last text-center text-sm text-white sm:order-first">
            {`© Oleksandr Sekker ${new Date().getFullYear()}`}
          </span>
          <div className="mt-4 flex justify-center space-x-6 sm:mt-0">
            {links.map(({ link, icon, id }) => (
              <Link key={id} href={link}>
                <FontAwesomeIcon
                  icon={icon}
                  className="h-4 w-4 text-white hover:text-gray-600"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
