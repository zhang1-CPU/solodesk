import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { Project } from '@/types';

export function useProjects() {
  const projects = useLiveQuery(() => db.projects.orderBy('createdAt').reverse().toArray(), []) ?? [];

  const addProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    await db.projects.add({ ...project, createdAt: now, updatedAt: now });
  };

  const updateProject = async (id: number, updates: Partial<Project>) => {
    await db.projects.update(id, { ...updates, updatedAt: new Date() });
  };

  const deleteProject = async (id: number) => {
    await db.projects.delete(id);
  };

  return { projects, addProject, updateProject, deleteProject };
}
