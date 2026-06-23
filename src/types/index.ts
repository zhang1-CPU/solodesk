export interface Client {
  id?: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  hourlyRate: number;
  currency: string;
  notes: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id?: number;
  clientId: number;
  name: string;
  description: string;
  status: 'quoted' | 'active' | 'completed' | 'invoiced' | 'paid' | 'cancelled';
  budget: number;
  currency: string;
  startDate: Date | null;
  endDate: Date | null;
  dueDate: Date | null;
  hourlyRate: number | null;
  isBillable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id?: number;
  projectId: number;
  description: string;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  isBillable: boolean;
  hourlyRate: number | null;
  createdAt: Date;
}

export interface Income {
  id?: number;
  projectId: number | null;
  clientId: number | null;
  amount: number;
  currency: string;
  date: Date;
  type: 'hourly' | 'fixed' | 'retainer' | 'bonus' | 'other';
  notes: string;
  isTaxable: boolean;
  createdAt: Date;
}

export interface Expense {
  id?: number;
  category: 'software' | 'hardware' | 'office' | 'travel' | 'marketing' | 'professional_services' | 'taxes' | 'other';
  amount: number;
  currency: string;
  date: Date;
  description: string;
  isDeductible: boolean;
  receiptUrl: string | null;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id?: number;
  projectId: number | null;
  clientId: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes: string;
  createdAt: Date;
}

export interface AppSettings {
  key: string;
  value?: any;
  currency?: string;
  language?: string;
  colorScheme?: 'light' | 'dark' | 'system';
}

export interface TimerState {
  isRunning: boolean;
  startTime: Date | null;
  elapsedSeconds: number;
  selectedProjectId: number | null;
  description: string;
}
