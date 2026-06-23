import Dexie, { type Table } from 'dexie';
import type { 
  Client, Project, TimeEntry, Income, Expense, Invoice, AppSettings 
} from '@/types';

export class SoloDeskDB extends Dexie {
  clients!: Table<Client, number>;
  projects!: Table<Project, number>;
  timeEntries!: Table<TimeEntry, number>;
  income!: Table<Income, number>;
  expenses!: Table<Expense, number>;
  invoices!: Table<Invoice, number>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('SoloDeskDB');
    this.version(1).stores({
      clients: '++id, name, email, createdAt, updatedAt',
      projects: '++id, clientId, status, dueDate, createdAt, updatedAt',
      timeEntries: '++id, projectId, startTime, createdAt',
      income: '++id, projectId, clientId, date, createdAt',
      expenses: '++id, category, date, createdAt',
      invoices: '++id, clientId, projectId, invoiceNumber, status, createdAt',
      settings: 'key',
    });
  }
}

export const db = new SoloDeskDB();

// ==================== Demo Data Seeder ====================

export async function seedDemoData(): Promise<void> {
  const alreadySeeded = await db.settings.get('demoSeeded');
  if (alreadySeeded?.value === true) return;

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const clientId1 = await db.clients.add({
    name: 'Acme Corp',
    email: 'contact@acme.com',
    company: 'Acme Corporation',
    phone: '+1-555-0101',
    address: '123 Business Ave, New York, NY',
    hourlyRate: 75,
    currency: 'USD',
    notes: 'Long-term client, pays on time',
    color: '#10b981',
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
  });

  const clientId2 = await db.clients.add({
    name: 'Bright Design Studio',
    email: 'hello@brightdesign.co',
    company: 'Bright Design Studio LLC',
    phone: '+1-555-0202',
    address: '456 Creative St, San Francisco, CA',
    hourlyRate: 90,
    currency: 'USD',
    notes: 'Design-focused projects',
    color: '#3b82f6',
    createdAt: twoDaysAgo,
    updatedAt: twoDaysAgo,
  });

  const clientId3 = await db.clients.add({
    name: 'TechStart Inc',
    email: 'projects@techstart.io',
    company: 'TechStart Inc',
    phone: '+1-555-0303',
    address: '789 Innovation Blvd, Austin, TX',
    hourlyRate: 65,
    currency: 'USD',
    notes: 'Startup, fast-paced',
    color: '#f59e0b',
    createdAt: yesterday,
    updatedAt: yesterday,
  });

  const projectId1 = await db.projects.add({
    clientId: clientId1,
    name: 'Website Redesign',
    description: 'Complete redesign of corporate website with modern UI/UX',
    status: 'active',
    budget: 5000,
    currency: 'USD',
    startDate: twoDaysAgo,
    endDate: null,
    dueDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
    hourlyRate: 75,
    isBillable: true,
    createdAt: twoDaysAgo,
    updatedAt: yesterday,
  });

  const projectId2 = await db.projects.add({
    clientId: clientId2,
    name: 'Brand Identity System',
    description: 'Logo, color palette, typography, and brand guidelines',
    status: 'completed',
    budget: 3500,
    currency: 'USD',
    startDate: lastMonth,
    endDate: yesterday,
    dueDate: yesterday,
    hourlyRate: 90,
    isBillable: true,
    createdAt: lastMonth,
    updatedAt: yesterday,
  });

  const projectId3 = await db.projects.add({
    clientId: clientId3,
    name: 'Mobile App Prototype',
    description: 'Interactive prototype for iOS app',
    status: 'quoted',
    budget: 8000,
    currency: 'USD',
    startDate: null,
    endDate: null,
    dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    hourlyRate: 65,
    isBillable: true,
    createdAt: yesterday,
    updatedAt: yesterday,
  });

  await db.timeEntries.add({
    projectId: projectId1,
    description: 'Homepage wireframe and mockup',
    startTime: new Date(monthStart.getTime() + 9 * 60 * 60 * 1000),
    endTime: new Date(monthStart.getTime() + 12 * 60 * 60 * 1000),
    duration: 3 * 3600,
    isBillable: true,
    hourlyRate: 75,
    createdAt: monthStart,
  });

  await db.timeEntries.add({
    projectId: projectId1,
    description: 'Responsive layout implementation',
    startTime: new Date(monthStart.getTime() + 14 * 60 * 60 * 1000),
    endTime: new Date(monthStart.getTime() + 17 * 60 * 60 * 1000),
    duration: 3 * 3600,
    isBillable: true,
    hourlyRate: 75,
    createdAt: monthStart,
  });

  await db.timeEntries.add({
    projectId: projectId2,
    description: 'Logo concepts and revisions',
    startTime: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000),
    endTime: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000),
    duration: 4 * 3600,
    isBillable: true,
    hourlyRate: 90,
    createdAt: yesterday,
  });

  await db.income.add({
    projectId: projectId2,
    clientId: clientId2,
    amount: 3500,
    currency: 'USD',
    date: yesterday,
    type: 'fixed',
    notes: 'Final payment for brand identity project',
    isTaxable: true,
    createdAt: yesterday,
  });

  await db.income.add({
    projectId: projectId1,
    clientId: clientId1,
    amount: 1500,
    currency: 'USD',
    date: new Date(monthStart.getTime() + 5 * 24 * 60 * 60 * 1000),
    type: 'fixed',
    notes: '50% upfront for website redesign',
    isTaxable: true,
    createdAt: new Date(monthStart.getTime() + 5 * 24 * 60 * 60 * 1000),
  });

  await db.expenses.add({
    category: 'software',
    amount: 49,
    currency: 'USD',
    date: monthStart,
    description: 'Figma Pro subscription',
    isDeductible: true,
    receiptUrl: null,
    createdAt: monthStart,
  });

  await db.expenses.add({
    category: 'software',
    amount: 20,
    currency: 'USD',
    date: monthStart,
    description: 'Vercel Pro hosting',
    isDeductible: true,
    receiptUrl: null,
    createdAt: monthStart,
  });

  await db.invoices.add({
    clientId: clientId2,
    projectId: projectId2,
    invoiceNumber: 'INV-2026-0001',
    issueDate: yesterday,
    dueDate: new Date(yesterday.getTime() + 30 * 24 * 60 * 60 * 1000),
    items: [
      { description: 'Brand Identity System', quantity: 1, unitPrice: 3500, total: 3500 },
    ],
    subtotal: 3500,
    taxRate: 0,
    taxAmount: 0,
    total: 3500,
    currency: 'USD',
    status: 'sent',
    notes: 'Payment due within 30 days',
    createdAt: yesterday,
  });

  await db.settings.put({ key: 'demoSeeded', value: true });
  await db.settings.put({ key: 'onboardingComplete', value: false });
}

export async function clearAllData(): Promise<void> {
  await db.clients.clear();
  await db.projects.clear();
  await db.timeEntries.clear();
  await db.income.clear();
  await db.expenses.clear();
  await db.invoices.clear();
  await db.settings.clear();
}

export async function exportAllData(): Promise<Record<string, any[]>> {
  const [clients, projects, timeEntries, income, expenses, invoices] = await Promise.all([
    db.clients.toArray(),
    db.projects.toArray(),
    db.timeEntries.toArray(),
    db.income.toArray(),
    db.expenses.toArray(),
    db.invoices.toArray(),
  ]);

  return { clients, projects, timeEntries, income, expenses, invoices };
}

export async function importAllData(data: Record<string, any[]>): Promise<void> {
  await clearAllData();
  if (data.clients?.length) await db.clients.bulkAdd(data.clients);
  if (data.projects?.length) await db.projects.bulkAdd(data.projects);
  if (data.timeEntries?.length) await db.timeEntries.bulkAdd(data.timeEntries);
  if (data.income?.length) await db.income.bulkAdd(data.income);
  if (data.expenses?.length) await db.expenses.bulkAdd(data.expenses);
  if (data.invoices?.length) await db.invoices.bulkAdd(data.invoices);
}
