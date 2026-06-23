import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="md:ml-60 min-h-screen pb-20 md:pb-0">
        <Outlet />
      </main>

      <MobileNav />
    </div>
  );
}
