import { useState, useEffect } from 'react';
import { Briefcase, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            SoloDesk
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
            Pricing
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="#/app/dashboard"
            className="h-9 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors duration-150 flex items-center"
          >
            Open App
          </a>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm font-medium text-slate-600 dark:text-slate-300 py-2">Features</a>
          <a href="#pricing" className="block text-sm font-medium text-slate-600 dark:text-slate-300 py-2">Pricing</a>
          <a href="#/app/dashboard" className="block w-full h-10 bg-emerald-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center">
            Open App
          </a>
        </div>
      )}
    </header>
  );
}