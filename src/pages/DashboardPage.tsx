import { useEffect } from 'react';
import { DollarSign, Clock, FolderKanban, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/dashboard/StatCard';
import { IncomeChart } from '@/components/dashboard/IncomeChart';
import { ClientPieChart } from '@/components/dashboard/ClientPieChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboard } from '@/hooks/useDashboard';
import { formatCurrency, formatDurationHours } from '@/lib/utils';

export function DashboardPage() {
  const { stats, loading, fetchStats } = useDashboard();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-6">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))
          ) : (
            <>
              <StatCard
                title="Monthly Income"
                value={formatCurrency(stats?.monthlyIncome || 0)}
                icon={DollarSign}
                iconColor="text-emerald-500"
              />
              <StatCard
                title="Billable Hours"
                value={formatDurationHours((stats?.billableHours || 0) * 3600)}
                icon={Clock}
                iconColor="text-blue-500"
              />
              <StatCard
                title="Active Projects"
                value={stats?.activeProjects?.toString() || '0'}
                icon={FolderKanban}
                iconColor="text-purple-500"
              />
              <StatCard
                title="Avg Hourly Rate"
                value={formatCurrency(stats?.avgHourlyRate || 0)}
                icon={TrendingUp}
                iconColor="text-amber-500"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <div className="lg:col-span-2 rounded-lg border p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="rounded-lg border p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            </>
          ) : (
            <>
              <IncomeChart data={stats?.incomeTrend || []} />
              <ClientPieChart data={stats?.clientBreakdown || []} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <div className="lg:col-span-2 rounded-lg border p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="rounded-lg border p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            </>
          ) : (
            <>
              <RecentActivity activities={stats?.recentActivity || []} />
              <QuickActions />
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
