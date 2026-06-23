export const PROJECT_STATUS = {
  quoted: { label: 'Quoted', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  active: { label: 'Active', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  completed: { label: 'Completed', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' },
  invoiced: { label: 'Invoiced', color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' },
  paid: { label: 'Paid', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
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
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
] as const;

export const DEFAULT_SETTINGS = {
  currency: 'USD',
  language: 'en',
  theme: 'system',
  defaultHourlyRate: 50,
  taxRate: 0,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h',
  weekStartsOn: 0,
} as const;

export const INVOICE_STATUS = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  sent: { label: 'Sent', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  paid: { label: 'Paid', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  overdue: { label: 'Overdue', color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
} as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
] as const;

export const COLOR_SCHEMES = [
  { value: 'light', label: 'Light', icon: 'Sun', iconColor: 'text-amber-500' },
  { value: 'dark', label: 'Dark', icon: 'Moon', iconColor: 'text-slate-300' },
  { value: 'system', label: 'System', icon: 'Monitor', iconColor: 'text-blue-500' },
] as const;
