import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Toaster } from '@/components/ui/toaster';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  title?: string;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/clients': 'Clients',
  '/projects': 'Projects',
  '/time-tracker': 'Time Tracker',
  '/income': 'Income & Expenses',
  '/invoices': 'Invoices',
  '/settings': 'Settings',
};

export function AppShell({ children, title }: AppShellProps) {
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  const pageTitle = title || pageTitles[location.pathname] || 'Dashboard';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300',
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        )}
      >
        <TopBar title={pageTitle} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
        <MobileNav />
      </div>
      <Toaster />
    </div>
  );
}
