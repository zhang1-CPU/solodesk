import { DollarSign, Clock, FolderKanban, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/lib/utils';

interface ActivityItem {
  type: 'income' | 'time' | 'project' | 'invoice';
  description: string;
  date: Date;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const activityIcons = {
  income: DollarSign,
  time: Clock,
  project: FolderKanban,
  invoice: FileText,
};

const activityColors = {
  income: 'text-emerald-500 bg-emerald-500/10',
  time: 'text-blue-500 bg-blue-500/10',
  project: 'text-purple-500 bg-purple-500/10',
  invoice: 'text-amber-500 bg-amber-500/10',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-72">
          <div className="space-y-1 p-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(activity.date, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                No recent activity
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
