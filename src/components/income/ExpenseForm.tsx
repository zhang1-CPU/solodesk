import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EXPENSE_CATEGORIES, CURRENCIES } from '@/lib/constants';
import type { Expense } from '@/types';

interface ExpenseFormProps {
  open: boolean;
  expense?: Expense | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
}

export function ExpenseForm({ open, expense, onOpenChange, onSubmit, isLoading }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    category: 'software' as Expense['category'],
    amount: 0,
    currency: 'USD',
    date: new Date(),
    description: '',
    isDeductible: true,
    receiptUrl: null as string | null,
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        category: expense.category,
        amount: expense.amount,
        currency: expense.currency,
        date: new Date(expense.date),
        description: expense.description,
        isDeductible: expense.isDeductible,
        receiptUrl: expense.receiptUrl,
      });
    } else {
      setFormData({
        category: 'software',
        amount: 0,
        currency: 'USD',
        date: new Date(),
        description: '',
        isDeductible: true,
        receiptUrl: null,
      });
    }
  }, [expense, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.symbol} {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Expense['category']) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              placeholder="What was this expense for?"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="deductible">Tax Deductible</Label>
              <p className="text-xs text-muted-foreground">
                Can be deducted from taxes
              </p>
            </div>
            <Switch
              id="deductible"
              checked={formData.isDeductible}
              onCheckedChange={(checked) => setFormData({ ...formData, isDeductible: checked })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : expense ? 'Save Changes' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
