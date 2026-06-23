import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  iconColor = 'text-primary',
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('p-2 rounded-lg bg-primary/10', iconColor.replace('text-', 'bg-').replace('-500', '-500/10'))}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-1 text-xs">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span
              className={cn(
                'font-medium',
                isPositive ? 'text-emerald-500' : 'text-red-500'
              )}
            >
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span className="text-muted-foreground">{trendLabel || 'vs last month'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
