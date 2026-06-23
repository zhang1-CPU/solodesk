import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
import type { DashboardStats } from '@/types';

export function useDashboard(): DashboardStats {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const income = useLiveQuery(
    () => db.income.where('date').between(monthStart, monthEnd).toArray(),
    [now.getMonth(), now.getFullYear()]
  ) ?? [];

  const timeEntries = useLiveQuery(
    () => db.timeEntries.where('startTime').between(monthStart, monthEnd).toArray(),
    [now.getMonth(), now.getFullYear()]
  ) ?? [];

  const activeProjects = useLiveQuery(
    () => db.projects.where('status').equals('active').count(),
    []
  ) ?? 0;

  const pendingInvoices = useLiveQuery(
    () => db.invoices.where('status').anyOf('sent', 'overdue').count(),
    []
  ) ?? 0;

  const allIncome = useLiveQuery(() => db.income.toArray(), []) ?? [];
  const allClients = useLiveQuery(() => db.clients.toArray(), []) ?? [];

  const monthlyIncomeData = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(now, 5 - i);
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const amount = allIncome
      .filter((inc) => inc.date >= start && inc.date <= end)
      .reduce((sum, inc) => sum + inc.amount, 0);
    return { month: format(d, 'MMM'), amount };
  });

  const clientIncomeMap = new Map<string, number>();
  allIncome.forEach((inc) => {
    const client = allClients.find((c) => c.id === inc.clientId);
    const name = client?.name ?? 'Unknown';
    clientIncomeMap.set(name, (clientIncomeMap.get(name) ?? 0) + inc.amount);
  });
  const clientIncomeData = Array.from(clientIncomeMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalSeconds = timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  const totalHours = totalSeconds / 3600;
  const avgHourlyRate = totalHours > 0 ? totalIncome / totalHours : 0;

  return {
    totalIncome,
    totalHours,
    avgHourlyRate,
    activeProjectsCount: activeProjects,
    pendingInvoicesCount: pendingInvoices,
    monthlyIncomeData,
    clientIncomeData,
  };
}
