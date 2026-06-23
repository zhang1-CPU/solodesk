import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, FolderKanban, Timer, Wallet } from 'lucide-react';

const mobileItems = [
  { path: '/app/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/app/clients', label: 'Clients', icon: Users },
  { path: '/app/projects', label: 'Projects', icon: FolderKanban },
  { path: '/app/time-tracker', label: 'Time', icon: Timer },
  { path: '/app/income', label: 'Income', icon: Wallet },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around px-2">
      {mobileItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
              isActive ? "text-emerald-500" : "text-slate-400"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
