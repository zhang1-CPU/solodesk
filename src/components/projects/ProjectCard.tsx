import { MoreHorizontal, Calendar, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Project, Client } from '@/types';
import { PROJECT_STATUS } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  client?: Client;
  totalTime?: number;
  onEdit?: (project: Project) => void;
  onDelete?: (id: number) => void;
  onClick?: (project: Project) => void;
}

export function ProjectCard({ project, client, totalTime = 0, onEdit, onDelete, onClick }: ProjectCardProps) {
  const statusConfig = PROJECT_STATUS[project.status];
  const progress = project.budget > 0
    ? Math.min(100, (totalTime / 3600 * (project.hourlyRate || 0)) / project.budget * 100)
    : 0;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={() => onClick?.(project)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-none">{project.name}</h3>
            <Badge variant="outline" className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
          </div>
          {client && (
            <p className="text-sm text-muted-foreground">{client.name}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(project); }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={(e) => { e.stopPropagation(); project.id && onDelete?.(project.id); }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <DollarSign className="h-3.5 w-3.5" />
            <span>{formatCurrency(project.budget, project.currency)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{(totalTime / 3600).toFixed(1)}h</span>
          </div>
        </div>

        {project.budget > 0 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {project.dueDate && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Due: {formatDate(project.dueDate, 'MMM dd, yyyy')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
