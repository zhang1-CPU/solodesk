import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { ClientCard } from '@/components/clients/ClientCard';
import { ClientForm } from '@/components/clients/ClientForm';
import { ClientDetail } from '@/components/clients/ClientDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useClients } from '@/hooks/useClients';
import { useIncome } from '@/hooks/useIncome';
import type { Client } from '@/types';

export function ClientsPage() {
  const { clients, loading, loadClients, createClient, updateClient, deleteClient } = useClients();
  const { income, loadIncome } = useIncome();
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadClients();
    loadIncome();
  }, [loadClients, loadIncome]);

  const getClientIncome = (clientId: number) => {
    return income
      .filter((i) => i.clientId === clientId)
      .reduce((sum, i) => sum + i.amount, 0);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    setEditingClient(null);
    setFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleSubmit = async (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingClient && editingClient.id) {
      await updateClient(editingClient.id, data);
    } else {
      await createClient(data);
    }
    setFormOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClient = async (id: number) => {
    if (confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
      if (selectedClient?.id === id) {
        setDetailOpen(false);
        setSelectedClient(null);
      }
    }
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setDetailOpen(true);
  };

  const handleEditFromDetail = () => {
    if (selectedClient) {
      setEditingClient(selectedClient);
      setFormOpen(true);
      setDetailOpen(false);
    }
  };

  return (
    <AppShell title="Clients">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={handleAddClient}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                totalIncome={getClientIncome(client.id!)}
                onEdit={handleEditClient}
                onDelete={handleDeleteClient}
                onClick={handleClientClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {searchQuery ? 'No clients match your search.' : 'Start by adding your first client to track projects and income.'}
            </p>
            {!searchQuery && (
              <Button onClick={handleAddClient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </div>
        )}
      </div>

      <ClientForm
        open={formOpen}
        client={editingClient}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
      />

      <ClientDetail
        client={selectedClient}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={handleEditFromDetail}
        totalIncome={selectedClient ? getClientIncome(selectedClient.id!) : 0}
      />
    </AppShell>
  );
}
