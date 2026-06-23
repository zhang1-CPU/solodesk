import { Play, Pause, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { formatDuration } from '@/lib/utils';
import type { Project } from '@/types';

interface TimerWidgetProps {
  isRunning: boolean;
  elapsedSeconds: number;
  selectedProjectId: number | null;
  description: string;
  projects: Project[];
  isBillable: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onProjectChange: (projectId: number | null) => void;
  onDescriptionChange: (description: string) => void;
  onBillableChange: (billable: boolean) => void;
}

export function TimerWidget({
  isRunning,
  elapsedSeconds,
  selectedProjectId,
  description,
  projects,
  isBillable,
  onStart,
  onPause,
  onStop,
  onProjectChange,
  onDescriptionChange,
  onBillableChange,
}: TimerWidgetProps) {
  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold font-mono tracking-tight">
            {formatDuration(elapsedSeconds)}
          </div>
          {isRunning && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-emerald-600">Tracking time...</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select
            value={selectedProjectId?.toString() || ''}
            onValueChange={(value) => onProjectChange(value ? parseInt(value) : null)}
          >
            <SelectTrigger id="project">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id!.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">What are you working on?</Label>
          <Input
            id="description"
            placeholder="e.g., Designing landing page"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="billable">Billable</Label>
            <p className="text-xs text-muted-foreground">
              Track as billable hours
            </p>
          </div>
          <Switch
            id="billable"
            checked={isBillable}
            onCheckedChange={onBillableChange}
          />
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <Button className="flex-1" size="lg" onClick={onStart}>
              <Play className="h-5 w-5 mr-2" />
              Start
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                className="flex-1"
                size="lg"
                onClick={onPause}
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={onStop}
              >
                <Square className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
