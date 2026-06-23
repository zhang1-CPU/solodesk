import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

export function DashboardPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Dashboard Coming Soon
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          The full dashboard with clients, projects, time tracking, and invoicing is under development. Check back soon!
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Currently in Phase 2 of development
        </div>
        <a
          href="#/"
          className="inline-flex items-center gap-2 h-10 px-4 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    </div>
  );
}