import { cn, formatCurrency, formatDurationDecimal } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  format: 'currency' | 'hours' | 'number';
  currency?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export function StatCard({ title, value, format, currency = 'USD', change, changeType, icon: Icon, iconBg, iconColor }: StatCardProps) {
  const formattedValue = format === 'currency' 
    ? formatCurrency(value, currency)
    : format === 'hours'
    ? formatDurationDecimal(value * 3600)
    : value.toString();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            changeType === 'positive' ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
            changeType === 'negative' ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" :
            "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
          )}>
            {change}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
        {formattedValue}
      </p>
    </div>
  );
}
