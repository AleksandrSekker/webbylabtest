import { useEffect, useState } from "react";

type Theme = "dark" | "light";
function useDarkMode(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? (localStorage.getItem("theme") as Theme)
      : "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
