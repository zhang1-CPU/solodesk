import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { Client } from '@/types';

export function useClients() {
  const clients = useLiveQuery(() => db.clients.orderBy('createdAt').reverse().toArray(), []) ?? [];

  const addClient = async (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    await db.clients.add({ ...client, createdAt: now, updatedAt: now });
  };

  const updateClient = async (id: number, updates: Partial<Client>) => {
    await db.clients.update(id, { ...updates, updatedAt: new Date() });
  };

  const deleteClient = async (id: number) => {
    await db.clients.delete(id);
  };

  return { clients, addClient, updateClient, deleteClient };
}
