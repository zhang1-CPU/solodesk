import { useState, useEffect } from 'react';
import { Plus, Search, LayoutGrid, List } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { ProjectKanban } from '@/components/projects/ProjectKanban';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects } from '@/hooks/useProjects';
import { useClients } from '@/hooks/useClients';
import { useTimeTracker } from '@/hooks/useTimeTracker';
import type { Project } from '@/types';

export function ProjectsPage() {
  const { projects, loading, loadProjects, createProject, updateProject, deleteProject } = useProjects();
  const { clients, loadClients } = useClients();
  const { timeEntries, loadTimeEntries } = useTimeTracker();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');

  useEffect(() => {
    loadProjects();
    loadClients();
    loadTimeEntries();
  }, [loadProjects, loadClients, loadTimeEntries]);

  const getProjectTime = (projectId: number) => {
    return timeEntries
      .filter((t) => t.projectId === projectId)
      .reduce((sum, t) => sum + t.duration, 0);
  };

  const getClient = (clientId: number) => {
    return clients.find((c) => c.id === clientId);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getClient(project.clientId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProject = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleSubmit = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProject && editingProject.id) {
      await updateProject(editingProject.id, data);
    } else {
      await createProject(data);
    }
    setFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  return (
    <AppShell title="Projects">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'kanban')}>
              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="kanban">
                  <List className="h-4 w-4 mr-2" />
                  Kanban
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button onClick={handleAddProject}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-6">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20 mb-4" />
                <Skeleton className="h-2 w-full mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : viewMode === 'kanban' ? (
          <ProjectKanban
            projects={filteredProjects}
            clients={clients}
          />
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                client={getClient(project.clientId)}
                totalTime={getProjectTime(project.id!)}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {searchQuery ? 'No projects match your search.' : 'Create your first project to start tracking time and income.'}
            </p>
            {!searchQuery && (
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            )}
          </div>
        )}
      </div>

      <ProjectForm
        open={formOpen}
        project={editingProject}
        clients={clients}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}
