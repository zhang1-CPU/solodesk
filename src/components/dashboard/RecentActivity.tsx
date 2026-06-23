import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { formatDateRelative, formatCurrency } from '@/lib/utils';
import { DollarSign, Clock, FolderPlus, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentActivity() {
  const recentIncome = useLiveQuery(
    () => db.income.orderBy('createdAt').reverse().limit(3).toArray(),
    []
  ) ?? [];

  const recentTime = useLiveQuery(
    () => db.timeEntries.orderBy('createdAt').reverse().limit(3).toArray(),
    []
  ) ?? [];

  const recentProjects = useLiveQuery(
    () => db.projects.orderBy('createdAt').reverse().limit(3).toArray(),
    []
  ) ?? [];

  const activities = [
    ...recentIncome.map((inc) => ({
      type: 'income' as const,
      icon: DollarSign,
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      text: `Recorded ${formatCurrency(inc.amount)}`,
      time: formatDateRelative(inc.createdAt),
    })),
    ...recentTime.map((entry) => ({
      type: 'time' as const,
      icon: Clock,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
      iconColor: 'text-blue-500',
      text: `Tracked ${Math.round(entry.duration / 3600 * 10) / 10}h`,
      time: formatDateRelative(entry.createdAt),
    })),
    ...recentProjects.map((proj) => ({
      type: 'project' as const,
      icon: FolderPlus,
      iconBg: 'bg-amber-50 dark:bg-amber-500/10',
      iconColor: 'text-amber-500',
      text: `Created project "${proj.name}"`,
      time: formatDateRelative(proj.createdAt),
    })),
  ]
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", activity.iconBg)}>
                <activity.icon className={cn("w-4 h-4", activity.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-200 truncate">{activity.text}</p>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{activity.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
