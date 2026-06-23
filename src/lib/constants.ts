export const PROJECT_STATUS_CONFIG = {
  quoted: { label: 'Quoted', color: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600' },
  active: { label: 'Active', color: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' },
  completed: { label: 'Completed', color: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' },
  invoiced: { label: 'Invoiced', color: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' },
  paid: { label: 'Paid', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20' },
} as const;

export const INCOME_TYPES = [
  { value: 'hourly', label: 'Hourly Work' },
  { value: 'fixed', label: 'Fixed Project' },
  { value: 'retainer', label: 'Retainer' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'other', label: 'Other' },
] as const;

export const EXPENSE_CATEGORIES = [
  { value: 'software', label: 'Software & Tools', icon: 'Monitor' },
  { value: 'hardware', label: 'Hardware', icon: 'Laptop' },
  { value: 'office', label: 'Office Supplies', icon: 'Briefcase' },
  { value: 'travel', label: 'Travel', icon: 'Plane' },
  { value: 'marketing', label: 'Marketing', icon: 'Megaphone' },
  { value: 'professional_services', label: 'Professional Services', icon: 'Scale' },
  { value: 'taxes', label: 'Taxes & Licenses', icon: 'Receipt' },
  { value: 'other', label: 'Other', icon: 'MoreHorizontal' },
] as const;

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
] as const;

export const CLIENT_COLORS = [
  { value: '#10b981', label: 'Emerald' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ef4444', label: 'Red' },
  { value: '#64748b', label: 'Slate' },
] as const;

export const DEFAULT_SETTINGS = {
  currency: 'USD',
  language: 'en',
  theme: 'system' as const,
  defaultHourlyRate: 50,
  taxRate: 0,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h' as const,
  weekStartsOn: 0,
} as const;
