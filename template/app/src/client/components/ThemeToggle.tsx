import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return localStorage.getItem("socialsoccer-theme") !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    localStorage.setItem("socialsoccer-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((currentIsDark) => !currentIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#F4A261]/40 bg-white px-3 py-1.5 text-[#1D3557] shadow-sm transition-all duration-300 hover:bg-[#F4A261]/10 dark:border-[#0B5FA5]/40 dark:bg-[#2E3138] dark:text-[#FF6B35] dark:hover:bg-[#0B5FA5]/20"
      aria-label="Cambiar tema de color"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 animate-pulse text-[#FF6B35]" />
          <span className="text-xs font-semibold tracking-wide">
            Modo Oscuro
          </span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-[#1D3557]" />
          <span className="text-xs font-semibold tracking-wide">
            Modo Claro
          </span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
