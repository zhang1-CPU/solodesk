import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, FolderKanban, Timer, Wallet, FileText, Settings, Briefcase 
} from 'lucide-react';

const navItems = [
  { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/app/clients', label: 'Clients', icon: Users },
  { path: '/app/projects', label: 'Projects', icon: FolderKanban },
  { path: '/app/time-tracker', label: 'Time Tracker', icon: Timer },
  { path: '/app/income', label: 'Income', icon: Wallet },
  { path: '/app/invoices', label: 'Invoices', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 h-screen fixed left-0 top-0 bg-slate-900 border-r border-slate-800 flex flex-col z-40">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center mr-3">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold text-white tracking-tight">SoloDesk</span>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-slate-800 text-emerald-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-emerald-400" : "text-slate-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600">
        <h4 className="text-sm font-semibold text-white mb-1">Upgrade to Pro</h4>
        <p className="text-xs text-slate-400 mb-3">Unlock AI quotes, tax reports & more.</p>
        <button className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
          $12/month
        </button>
      </div>

      <div className="h-14 border-t border-slate-800 px-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-medium">
          F
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm text-slate-200 truncate">Freelancer</p>
          <p className="text-xs text-slate-500 truncate">Local Mode</p>
        </div>
        <Link to="/app/settings" className="p-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors">
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
