import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import type { Project } from '@/types';
import { useUIStore } from '@/stores/uiStore';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const addToast = useUIStore((state) => state.addToast);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.projects.orderBy('createdAt').reverse().toArray();
      setProjects(data);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load projects', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const createProject = useCallback(
    async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const now = new Date();
        const id = await db.projects.add({
          ...project,
          createdAt: now,
          updatedAt: now,
        });
        const newProject = await db.projects.get(id);
        if (newProject) {
          setProjects((prev) => [newProject, ...prev]);
        }
        addToast({ title: 'Success', description: 'Project created', variant: 'success' });
        return id;
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to create project', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const updateProject = useCallback(
    async (id: number, project: Partial<Project>) => {
      try {
        await db.projects.update(id, { ...project, updatedAt: new Date() });
        const updatedProject = await db.projects.get(id);
        if (updatedProject) {
          setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
        }
        addToast({ title: 'Success', description: 'Project updated', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to update project', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const deleteProject = useCallback(
    async (id: number) => {
      try {
        await db.projects.delete(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        addToast({ title: 'Success', description: 'Project deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  return {
    projects,
    loading,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
