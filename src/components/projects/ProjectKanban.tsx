import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROJECT_STATUS } from '@/lib/constants';
import type { Project, Client } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProjectKanbanProps {
  projects: Project[];
  clients: Client[];
  onProjectClick?: (project: Project) => void;
}

const kanbanColumns = [
  { status: 'quoted', label: 'Quoted' },
  { status: 'active', label: 'Active' },
  { status: 'completed', label: 'Completed' },
  { status: 'invoiced', label: 'Invoiced' },
  { status: 'paid', label: 'Paid' },
] as const;

export function ProjectKanban({ projects, clients, onProjectClick }: ProjectKanbanProps) {
  const getProjectsByStatus = (status: string) => {
    return projects.filter((p) => p.status === status);
  };

  const getClient = (clientId: number) => {
    return clients.find((c) => c.id === clientId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
      {kanbanColumns.map((column) => {
        const columnProjects = getProjectsByStatus(column.status);
        const statusConfig = PROJECT_STATUS[column.status];

        return (
          <div
              key={column.status}
              className="flex-shrink-0 w-72"
              onDragOver={handleDragOver}
            >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', statusConfig.color.split(' ')[0].replace('bg-', 'bg-').replace('-50', '-500'))} />
                    {column.label}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {columnProjects.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-2 pr-2">
                    {columnProjects.map((project) => {
                      const client = getClient(project.clientId);
                      return (
                        <div
                          key={project.id}
                          className="rounded-lg border bg-background p-3 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => onProjectClick?.(project)}
                        >
                          <h4 className="font-medium text-sm mb-1 truncate">
                            {project.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 truncate">
                            {client?.name || 'Unknown client'}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {formatCurrency(project.budget, project.currency)}
                            </span>
                            <Badge variant="outline" className={statusConfig.color}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    {columnProjects.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-muted-foreground border border-dashed rounded-lg">
                        No projects
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
