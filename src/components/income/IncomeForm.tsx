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
import { INCOME_TYPES, CURRENCIES } from '@/lib/constants';
import type { Income, Client, Project } from '@/types';

interface IncomeFormProps {
  open: boolean;
  income?: Income | null;
  clients: Client[];
  projects: Project[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Income, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
}

export function IncomeForm({ open, income, clients, projects, onOpenChange, onSubmit, isLoading }: IncomeFormProps) {
  const [formData, setFormData] = useState({
    projectId: null as number | null,
    clientId: null as number | null,
    amount: 0,
    currency: 'USD',
    date: new Date(),
    type: 'hourly' as Income['type'],
    notes: '',
    isTaxable: true,
  });

  useEffect(() => {
    if (income) {
      setFormData({
        projectId: income.projectId,
        clientId: income.clientId,
        amount: income.amount,
        currency: income.currency,
        date: new Date(income.date),
        type: income.type,
        notes: income.notes,
        isTaxable: income.isTaxable,
      });
    } else {
      setFormData({
        projectId: null,
        clientId: null,
        amount: 0,
        currency: 'USD',
        date: new Date(),
        type: 'hourly',
        notes: '',
        isTaxable: true,
      });
    }
  }, [income, open]);

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
          <DialogTitle>{income ? 'Edit Income' : 'Add Income'}</DialogTitle>
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
            <Label htmlFor="type">Income Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: Income['type']) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INCOME_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select
              value={formData.clientId?.toString() || ''}
              onValueChange={(value) => setFormData({ ...formData, clientId: value ? parseInt(value) : null })}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder="Select client (optional)" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id!.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select
              value={formData.projectId?.toString() || ''}
              onValueChange={(value) => setFormData({ ...formData, projectId: value ? parseInt(value) : null })}
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Select project (optional)" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id!.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="taxable">Taxable</Label>
              <p className="text-xs text-muted-foreground">
                Include in tax calculations
              </p>
            </div>
            <Switch
              id="taxable"
              checked={formData.isTaxable}
              onCheckedChange={(checked) => setFormData({ ...formData, isTaxable: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              placeholder="Add any notes..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : income ? 'Save Changes' : 'Add Income'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
