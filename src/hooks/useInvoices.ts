import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import type { Invoice } from '@/types';
import { useUIStore } from '@/stores/uiStore';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const addToast = useUIStore((state) => state.addToast);

  const loadInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.invoices.orderBy('createdAt').reverse().toArray();
      const today = new Date();
      const updatedInvoices = data.map((invoice) => {
        const dueDate = new Date(invoice.dueDate);
        if (invoice.status === 'sent' && dueDate < today) {
          return { ...invoice, status: 'overdue' as const };
        }
        return invoice;
      });
      setInvoices(updatedInvoices);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load invoices', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const generateInvoiceNumber = useCallback(async () => {
    const year = new Date().getFullYear();
    const count = await db.invoices.count();
    return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
  }, []);

  const createInvoice = useCallback(
    async (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => {
      try {
        const invoiceNumber = await generateInvoiceNumber();
        const now = new Date();
        const id = await db.invoices.add({
          ...invoice,
          invoiceNumber,
          createdAt: now,
        });
        const newInvoice = await db.invoices.get(id);
        if (newInvoice) {
          setInvoices((prev) => [newInvoice, ...prev]);
        }
        addToast({ title: 'Success', description: 'Invoice created', variant: 'success' });
        return id;
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to create invoice', variant: 'destructive' });
        throw error;
      }
    },
    [generateInvoiceNumber, addToast]
  );

  const updateInvoice = useCallback(
    async (id: number, invoice: Partial<Invoice>) => {
      try {
        await db.invoices.update(id, invoice);
        const updatedInvoice = await db.invoices.get(id);
        if (updatedInvoice) {
          setInvoices((prev) => prev.map((i) => (i.id === id ? updatedInvoice : i)));
        }
        addToast({ title: 'Success', description: 'Invoice updated', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to update invoice', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const deleteInvoice = useCallback(
    async (id: number) => {
      try {
        await db.invoices.delete(id);
        setInvoices((prev) => prev.filter((i) => i.id !== id));
        addToast({ title: 'Success', description: 'Invoice deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete invoice', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const markAsPaid = useCallback(
    async (id: number) => {
      await updateInvoice(id, { status: 'paid' });
    },
    [updateInvoice]
  );

  return {
    invoices,
    loading,
    loadInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
  };
}
