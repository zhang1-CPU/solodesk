// ==================== 核心实体 ====================

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
  clientId: number | null;
  name: string;
  description: string;
  status: ProjectStatus;
  budget: number | null;
  currency: string;
  startDate: Date | null;
  endDate: Date | null;
  dueDate: Date | null;
  hourlyRate: number | null;
  isBillable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 
  | 'quoted' 
  | 'active' 
  | 'completed' 
  | 'invoiced' 
  | 'paid' 
  | 'cancelled';

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
  type: IncomeType;
  notes: string;
  isTaxable: boolean;
  createdAt: Date;
}

export type IncomeType = 'hourly' | 'fixed' | 'retainer' | 'bonus' | 'other';

export interface Expense {
  id?: number;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  date: Date;
  description: string;
  isDeductible: boolean;
  receiptUrl: string | null;
  createdAt: Date;
}

export type ExpenseCategory = 
  | 'software' 
  | 'hardware' 
  | 'office' 
  | 'travel' 
  | 'marketing' 
  | 'professional_services' 
  | 'taxes' 
  | 'other';

export interface Invoice {
  id?: number;
  clientId: number;
  projectId: number | null;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  notes: string;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface AppSettings {
  key: string;
  value: any;
}

// ==================== UI 类型 ====================

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface DashboardStats {
  totalIncome: number;
  totalHours: number;
  avgHourlyRate: number;
  activeProjectsCount: number;
  pendingInvoicesCount: number;
  monthlyIncomeData: MonthlyIncomeData[];
  clientIncomeData: ClientIncomeData[];
}

export interface MonthlyIncomeData {
  month: string;
  amount: number;
}

export interface ClientIncomeData {
  name: string;
  value: number;
}
