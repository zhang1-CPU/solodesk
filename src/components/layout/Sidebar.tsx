import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Clock,
  DollarSign,
  FileText,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/clients', label: 'Clients', icon: Users },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/time-tracker', label: 'Time Tracker', icon: Clock },
  { path: '/income', label: 'Income', icon: DollarSign },
  { path: '/invoices', label: 'Invoices', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">
          Freelancer<span className="text-foreground">Hub</span>
        </h1>
      </div>
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
