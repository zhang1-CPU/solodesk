import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import { isSameMonth, format } from 'date-fns';

interface DashboardStats {
  monthlyIncome: number;
  billableHours: number;
  activeProjects: number;
  avgHourlyRate: number;
  incomeTrend: { month: string; income: number }[];
  clientBreakdown: { name: string; income: number; color: string }[];
  recentActivity: { type: 'income' | 'time' | 'project' | 'invoice'; description: string; date: Date }[];
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const now = new Date();

      const [income, timeEntries, projects, clients] = await Promise.all([
        db.income.toArray(),
        db.timeEntries.toArray(),
        db.projects.toArray(),
        db.clients.toArray(),
      ]);

      const monthlyIncome = income
        .filter((i) => {
          const date = new Date(i.date);
          return isSameMonth(date, now);
        })
        .reduce((sum, i) => sum + i.amount, 0);

      const billableHours = timeEntries
        .filter((t) => {
          const date = new Date(t.startTime);
          return isSameMonth(date, now) && t.isBillable;
        })
        .reduce((sum, t) => sum + t.duration, 0) / 3600;

      const activeProjects = projects.filter((p) => p.status === 'active').length;

      const totalBillableIncome = timeEntries
        .filter((t) => t.isBillable)
        .reduce((sum, t) => {
          const rate = t.hourlyRate || 0;
          return sum + (rate * t.duration) / 3600;
        }, 0);

      const totalBillableTime = timeEntries
        .filter((t) => t.isBillable)
        .reduce((sum, t) => sum + t.duration, 0) / 3600;

      const avgHourlyRate = totalBillableTime > 0 ? totalBillableIncome / totalBillableTime : 0;

      const incomeTrend = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthIncome = income
          .filter((inc) => isSameMonth(new Date(inc.date), date))
          .reduce((sum, inc) => sum + inc.amount, 0);
        return {
          month: format(date, 'MMM'),
          income: monthIncome,
        };
      }).reverse();

      const clientIncomeMap = new Map<number, number>();
      income.forEach((inc) => {
        if (inc.clientId) {
          clientIncomeMap.set(inc.clientId, (clientIncomeMap.get(inc.clientId) || 0) + inc.amount);
        }
      });

      const clientBreakdown = clients
        .map((client) => ({
          name: client.name,
          income: clientIncomeMap.get(client.id!) || 0,
          color: client.color,
        }))
        .filter((c) => c.income > 0)
        .sort((a, b) => b.income - a.income);

      const recentActivity = [
        ...income.slice(-5).map((i) => ({
          type: 'income' as const,
          description: `Received $${i.amount.toFixed(2)} from income`,
          date: new Date(i.date),
        })),
        ...timeEntries.slice(-5).map((t) => ({
          type: 'time' as const,
          description: `Logged ${Math.round(t.duration / 60)} minutes`,
          date: new Date(t.startTime),
        })),
        ...projects.slice(-5).map((p) => ({
          type: 'project' as const,
          description: `Project "${p.name}" ${p.status}`,
          date: new Date(p.updatedAt),
        })),
      ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

      setStats({
        monthlyIncome,
        billableHours,
        activeProjects,
        avgHourlyRate,
        incomeTrend,
        clientBreakdown,
        recentActivity,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    fetchStats,
  };
}
