import { useState, useCallback, useEffect, useRef } from 'react';
import { db } from '@/lib/db';
import type { TimeEntry, TimerState } from '@/types';
import { useUIStore } from '@/stores/uiStore';

const STORAGE_KEY = 'fcc-timer-state';

export function useTimeTracker() {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    startTime: null,
    elapsedSeconds: 0,
    selectedProjectId: null,
    description: '',
  });
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addToast = useUIStore((state) => state.addToast);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isRunning && parsed.startTime) {
          const startTime = new Date(parsed.startTime);
          const now = new Date();
          const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
          setTimerState({
            ...parsed,
            startTime,
            elapsedSeconds: elapsed,
          });
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }, 1000);

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...timerState,
        startTime: timerState.startTime?.toISOString(),
      }));
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      localStorage.removeItem(STORAGE_KEY);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.startTime]);

  const loadTimeEntries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.timeEntries.orderBy('startTime').reverse().toArray();
      setTimeEntries(data);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load time entries', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const startTimer = useCallback((projectId: number, description: string) => {
    setTimerState({
      isRunning: true,
      startTime: new Date(),
      elapsedSeconds: 0,
      selectedProjectId: projectId,
      description,
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
    }));
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
      startTime: prev.startTime || new Date(),
    }));
  }, []);

  const stopTimer = useCallback(async () => {
    const { elapsedSeconds, selectedProjectId, description } = timerState;
    if (selectedProjectId && elapsedSeconds > 0) {
      try {
        const project = await db.projects.get(selectedProjectId);
        const hourlyRate = project?.hourlyRate || project?.clientId
          ? (await db.clients.get(project!.clientId))?.hourlyRate || null
          : null;

        const entry: Omit<TimeEntry, 'id' | 'createdAt'> = {
          projectId: selectedProjectId,
          description: description || 'Unnamed task',
          startTime: timerState.startTime || new Date(Date.now() - elapsedSeconds * 1000),
          endTime: new Date(),
          duration: elapsedSeconds,
          isBillable: project?.isBillable ?? true,
          hourlyRate,
        };

        await db.timeEntries.add({ ...entry, createdAt: new Date() });
        await loadTimeEntries();
        addToast({ title: 'Success', description: 'Time entry saved', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to save time entry', variant: 'destructive' });
      }
    }

    setTimerState({
      isRunning: false,
      startTime: null,
      elapsedSeconds: 0,
      selectedProjectId: null,
      description: '',
    });
  }, [timerState, loadTimeEntries, addToast]);

  const createTimeEntry = useCallback(
    async (entry: Omit<TimeEntry, 'id' | 'createdAt'>) => {
      try {
        await db.timeEntries.add({ ...entry, createdAt: new Date() });
        await loadTimeEntries();
        addToast({ title: 'Success', description: 'Time entry created', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to create time entry', variant: 'destructive' });
        throw error;
      }
    },
    [loadTimeEntries, addToast]
  );

  const deleteTimeEntry = useCallback(
    async (id: number) => {
      try {
        await db.timeEntries.delete(id);
        setTimeEntries((prev) => prev.filter((e) => e.id !== id));
        addToast({ title: 'Success', description: 'Time entry deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete time entry', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  return {
    timerState,
    timeEntries,
    loading,
    loadTimeEntries,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    createTimeEntry,
    deleteTimeEntry,
  };
}
