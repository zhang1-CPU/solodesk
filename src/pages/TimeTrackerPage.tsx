import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { TimerWidget } from '@/components/time-tracker/TimerWidget';
import { TimeEntryList } from '@/components/time-tracker/TimeEntryList';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimeTracker } from '@/hooks/useTimeTracker';
import { useProjects } from '@/hooks/useProjects';

export function TimeTrackerPage() {
  const {
    timerState,
    timeEntries,
    loading,
    loadTimeEntries,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    deleteTimeEntry,
  } = useTimeTracker();
  const { projects, loadProjects } = useProjects();
  const [isBillable, setIsBillable] = useState(true);

  useEffect(() => {
    loadTimeEntries();
    loadProjects();
  }, [loadTimeEntries, loadProjects]);

  const activeProjects = projects.filter((p) => p.status === 'active');

  const handleStart = () => {
    if (timerState.selectedProjectId) {
      if (timerState.elapsedSeconds > 0 && !timerState.isRunning) {
        resumeTimer();
      } else {
        startTimer(timerState.selectedProjectId, timerState.description);
      }
    }
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleStop = async () => {
    await stopTimer();
  };

  const handleProjectChange = (_projectId: number | null) => {
  };

  const handleDescriptionChange = (_description: string) => {
  };

  const handleDeleteEntry = async (id: number) => {
    if (confirm('Are you sure you want to delete this time entry?')) {
      await deleteTimeEntry(id);
    }
  };

  const handleEditEntry = (_id: number, _description: string) => {
  };

  return (
    <AppShell title="Time Tracker">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimerWidget
            isRunning={timerState.isRunning}
            elapsedSeconds={timerState.elapsedSeconds}
            selectedProjectId={timerState.selectedProjectId}
            description={timerState.description}
            projects={activeProjects}
            isBillable={isBillable}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
            onProjectChange={handleProjectChange}
            onDescriptionChange={handleDescriptionChange}
            onBillableChange={setIsBillable}
          />
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="rounded-lg border p-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <TimeEntryList
              entries={timeEntries}
              projects={projects}
              onDelete={handleDeleteEntry}
              onEdit={handleEditEntry}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
