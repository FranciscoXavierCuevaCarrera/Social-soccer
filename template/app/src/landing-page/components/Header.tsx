import {
  Award,
  Calendar,
  Menu,
  QrCode,
  Shield,
  Star,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "wasp/client/auth";

export function Header() {
  const { data: user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Partidos", href: "/matches", icon: Calendar },
    { name: "Carnet QR", href: "/identity", icon: QrCode },
    { name: "Billetera", href: "/payments", icon: Wallet },
    { name: "Árbitros", href: "/referees", icon: Star },
    { name: "Estadísticas", href: "/stats", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-gray-800 dark:bg-[#2E3138]/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <a href="/" className="group flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1D3557] to-[#0B5FA5] text-white shadow-md transition-transform group-hover:scale-105 dark:from-[#0B5FA5] dark:to-[#FF6B35]">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none tracking-tight text-[#1D3557] dark:text-white">
                Social
                <span className="text-[#0B5FA5] dark:text-[#FF6B35]">
                  Soccer
                </span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-400">
                Liga Digital 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 transition-all hover:bg-gray-100 hover:text-[#0B5FA5] dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-[#FF6B35]"
                >
                  <Icon className="h-4 w-4 text-[#0B5FA5] dark:text-[#FF6B35]" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* User Status / Action Button */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <a
                href="/profile"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-[#0B5FA5] dark:bg-[#FF6B35] dark:hover:bg-[#FF6B35]/90"
              >
                <User className="h-4 w-4" />
                {user.username || user.email || "Mi Cuenta"}
              </a>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-[#0B5FA5] dark:bg-[#FF6B35] dark:hover:bg-[#FF6B35]/90"
              >
                Ingresar a la Liga
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="space-y-2 border-b border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-gray-800 dark:bg-[#2E3138]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <Icon className="h-5 w-5 text-[#0B5FA5] dark:text-[#FF6B35]" />
                {link.name}
              </a>
            );
          })}

          <div className="border-t border-gray-100 pt-2 dark:border-gray-700/60">
            <a
              href={user ? "/profile" : "/login"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] py-2.5 text-xs font-bold text-white dark:bg-[#FF6B35]"
            >
              <User className="h-4 w-4" />
              {user
                ? user.username || user.email || "Mi Cuenta"
                : "Ingresar a la Liga"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
