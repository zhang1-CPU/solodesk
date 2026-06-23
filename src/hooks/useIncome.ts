import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import type { Income, Expense } from '@/types';
import { useUIStore } from '@/stores/uiStore';

export function useIncome() {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const addToast = useUIStore((state) => state.addToast);

  const loadIncome = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.income.orderBy('date').reverse().toArray();
      setIncome(data);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load income', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.expenses.orderBy('date').reverse().toArray();
      setExpenses(data);
    } catch (error) {
      addToast({ title: 'Error', description: 'Failed to load expenses', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const createIncome = useCallback(
    async (incomeItem: Omit<Income, 'id' | 'createdAt'>) => {
      try {
        const now = new Date();
        const id = await db.income.add({
          ...incomeItem,
          createdAt: now,
        });
        const newIncome = await db.income.get(id);
        if (newIncome) {
          setIncome((prev) => [newIncome, ...prev]);
        }
        addToast({ title: 'Success', description: 'Income recorded', variant: 'success' });
        return id;
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to record income', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const createExpense = useCallback(
    async (expense: Omit<Expense, 'id' | 'createdAt'>) => {
      try {
        const now = new Date();
        const id = await db.expenses.add({
          ...expense,
          createdAt: now,
        });
        const newExpense = await db.expenses.get(id);
        if (newExpense) {
          setExpenses((prev) => [newExpense, ...prev]);
        }
        addToast({ title: 'Success', description: 'Expense recorded', variant: 'success' });
        return id;
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to record expense', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const deleteIncome = useCallback(
    async (id: number) => {
      try {
        await db.income.delete(id);
        setIncome((prev) => prev.filter((i) => i.id !== id));
        addToast({ title: 'Success', description: 'Income deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete income', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  const deleteExpense = useCallback(
    async (id: number) => {
      try {
        await db.expenses.delete(id);
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        addToast({ title: 'Success', description: 'Expense deleted', variant: 'success' });
      } catch (error) {
        addToast({ title: 'Error', description: 'Failed to delete expense', variant: 'destructive' });
        throw error;
      }
    },
    [addToast]
  );

  return {
    income,
    expenses,
    loading,
    loadIncome,
    loadExpenses,
    createIncome,
    createExpense,
    deleteIncome,
    deleteExpense,
  };
}
