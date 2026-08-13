import React, { useState } from 'react';
import { 
  Shield, 
  QrCode, 
  Wallet, 
  Calendar, 
  Star, 
  Award, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { useAuth } from 'wasp/client/auth';

export function Header() {
  const { data: user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Partidos', href: '/matches', icon: Calendar },
    { name: 'Carnet QR', href: '/identity', icon: QrCode },
    { name: 'Billetera', href: '/payments', icon: Wallet },
    { name: 'Árbitros', href: '/referees', icon: Star },
    { name: 'Estadísticas', href: '/stats', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#2E3138]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D3557] to-[#0B5FA5] dark:from-[#0B5FA5] dark:to-[#FF6B35] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#1D3557] dark:text-white leading-none">
                Social<span className="text-[#0B5FA5] dark:text-[#FF6B35]">Soccer</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-400">
                Liga Digital 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#0B5FA5] dark:hover:text-[#FF6B35] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4 text-[#0B5FA5] dark:text-[#FF6B35]" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* User Status / Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <a
                href="/profile"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#1D3557] hover:bg-[#0B5FA5] dark:bg-[#FF6B35] dark:hover:bg-[#FF6B35]/90 transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                {user.username || user.email || 'Mi Cuenta'}
              </a>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-[#1D3557] hover:bg-[#0B5FA5] dark:bg-[#FF6B35] dark:hover:bg-[#FF6B35]/90 transition-all shadow-sm"
              >
                Ingresar a la Liga
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2E3138] px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon className="w-5 h-5 text-[#0B5FA5] dark:text-[#FF6B35]" />
                {link.name}
              </a>
            );
          })}
          
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60">
            <a
              href={user ? '/profile' : '/login'}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#1D3557] dark:bg-[#FF6B35]"
            >
              <User className="w-4 h-4" />
              {user ? (user.username || user.email || 'Mi Cuenta') : 'Ingresar a la Liga'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;