import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@headlessui/react";
import useDarkMode from "@/hooks/useDarkMode";


const ThemeSwitch = () => {
  const [theme, setTheme] = useDarkMode();
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    setEnabled((localStorage.getItem("theme") as string) === "dark");
  }, []);
  useEffect(() => {
    setTheme(enabled ? "dark" : "light");
  }, [enabled, setTheme, theme]);
  return (
    <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
      {({ checked }) => (
        <button
          className={`${
            checked ? "bg-blue-600" : "bg-gray-500"
          } relative inline-flex h-6 w-12 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition `}
          >
            {checked ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </span>
        </button>
      )}
    </Switch>
  );
};

export default ThemeSwitch;
