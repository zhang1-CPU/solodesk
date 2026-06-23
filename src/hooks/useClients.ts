import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import type { Client } from '@/types';
import { useUIStore } from '@/stores/uiStore';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const addToast = useUIStore((state) => state.addToast);

  const loadClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.clients.orderBy('createdAt').reverse().toArray();
      setClients(data);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load clients', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const createClient = useCallback(
    async (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const now = new Date();
        const id = await db.clients.add({
          ...client,
          createdAt: now,
          updatedAt: now,
        });
        const newClient = await db.clients.get(id);
        if (newClient) {
          setClients((prev) => [newClient, ...prev]);
        }
        addToast({ title: 'Success', description: 'Client created', variant: 'success' });
        return id;
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to create client', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const updateClient = useCallback(
    async (id: number, client: Partial<Client>) => {
      try {
        await db.clients.update(id, { ...client, updatedAt: new Date() });
        const updatedClient = await db.clients.get(id);
        if (updatedClient) {
          setClients((prev) => prev.map((c) => (c.id === id ? updatedClient : c)));
        }
        addToast({ title: 'Success', description: 'Client updated', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to update client', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const deleteClient = useCallback(
    async (id: number) => {
      try {
        await db.clients.delete(id);
        setClients((prev) => prev.filter((c) => c.id !== id));
        addToast({ title: 'Success', description: 'Client deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete client', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  return {
    clients,
    loading,
    loadClients,
    createClient,
    updateClient,
    deleteClient,
  };
}
