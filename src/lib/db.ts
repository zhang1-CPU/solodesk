import Dexie, { type Table } from 'dexie';
import type { Client, Project, TimeEntry, Income, Expense, Invoice, AppSettings } from '@/types';

export class FreelancerDB extends Dexie {
  clients!: Table<Client, number>;
  projects!: Table<Project, number>;
  timeEntries!: Table<TimeEntry, number>;
  income!: Table<Income, number>;
  expenses!: Table<Expense, number>;
  invoices!: Table<Invoice, number>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('FreelancerCommandCenter');
    this.version(1).stores({
      clients: '++id, name, email, createdAt',
      projects: '++id, clientId, status, dueDate, createdAt',
      timeEntries: '++id, projectId, startTime, createdAt',
      income: '++id, projectId, clientId, date, createdAt',
      expenses: '++id, category, date, createdAt',
      invoices: '++id, clientId, projectId, invoiceNumber, status, createdAt',
      settings: 'key',
    });
  }
}

export const db = new FreelancerDB();
