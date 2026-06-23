import { Trash2, Clock, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDuration, formatDate } from '@/lib/utils';
import type { TimeEntry, Project } from '@/types';

interface TimeEntryListProps {
  entries: TimeEntry[];
  projects: Project[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number, description: string) => void;
}

export function TimeEntryList({ entries, projects, onDelete, onEdit }: TimeEntryListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');

  const getProject = (projectId: number) => {
    return projects.find((p) => p.id === projectId);
  };

  const startEdit = (entry: TimeEntry) => {
    setEditingId(entry.id!);
    setEditDescription(entry.description);
  };

  const saveEdit = (id: number) => {
    onEdit?.(id, editDescription);
    setEditingId(null);
    setEditDescription('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDescription('');
  };

  const totalDuration = entries.reduce((sum, e) => sum + e.duration, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Time Entries
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {formatDuration(totalDuration)} total
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-2">
            {entries.length > 0 ? (
              entries.map((entry) => {
                const project = getProject(entry.projectId);
                const isEditing = editingId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => saveEdit(entry.id!)}
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEdit}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="font-medium text-sm">{entry.description || 'No description'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {project?.name || 'Unknown project'}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(entry.startTime, 'MMM dd, HH:mm')}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    {!isEditing && (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={entry.isBillable ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {formatDuration(entry.duration)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => startEdit(entry)}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:text-red-600"
                          onClick={() => entry.id && onDelete?.(entry.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                No time entries yet
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
