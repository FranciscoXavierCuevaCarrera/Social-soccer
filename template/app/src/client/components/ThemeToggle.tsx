import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    // Inicializar con la clase 'dark' predeterminada según DESIGN.md
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('socialsoccer-theme');

    if (storedTheme === 'light') {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('socialsoccer-theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('socialsoccer-theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer
        bg-white text-[#1D3557] border-[#F4A261]/40 hover:bg-[#F4A261]/10
        dark:bg-[#2E3138] dark:text-[#FF6B35] dark:border-[#0B5FA5]/40 dark:hover:bg-[#0B5FA5]/20"
      aria-label="Cambiar tema de color"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-[#FF6B35] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">Modo Oscuro</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#1D3557]" />
          <span className="text-xs font-semibold tracking-wide">Modo Claro</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
