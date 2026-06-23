import { useEffect } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { useUIStore } from '@/stores/uiStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { IncomeChart } from '@/components/dashboard/IncomeChart';
import { ClientPieChart } from '@/components/dashboard/ClientPieChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DollarSign, Clock, FolderOpen, TrendingUp } from 'lucide-react';
import { seedDemoData } from '@/lib/db';

export function DashboardPage() {
  const stats = useDashboard();
  const addToast = useUIStore((state) => state.addToast);

  useEffect(() => {
    seedDemoData().catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here's your business overview.
          </p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Income"
          value={stats.totalIncome}
          format="currency"
          currency="USD"
          change="+12%"
          changeType="positive"
          icon={DollarSign}
          iconBg="bg-emerald-50 dark:bg-emerald-500/10"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="Billable Hours"
          value={stats.totalHours}
          format="hours"
          change="+2.3h"
          changeType="positive"
          icon={Clock}
          iconBg="bg-blue-50 dark:bg-blue-500/10"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjectsCount}
          format="number"
          change="1 due soon"
          changeType="neutral"
          icon={FolderOpen}
          iconBg="bg-amber-50 dark:bg-amber-500/10"
          iconColor="text-amber-500"
        />
        <StatCard
          title="Avg. Hourly Rate"
          value={stats.avgHourlyRate}
          format="currency"
          currency="USD"
          change="On target"
          changeType="neutral"
          icon={TrendingUp}
          iconBg="bg-purple-50 dark:bg-purple-500/10"
          iconColor="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeChart data={stats.monthlyIncomeData} />
        </div>
        <div>
          <ClientPieChart data={stats.clientIncomeData} />
        </div>
      </div>

      <RecentActivity />
    </div>
  );
}
