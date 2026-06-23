import { useState, useEffect } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { IncomeForm } from '@/components/income/IncomeForm';
import { ExpenseForm } from '@/components/income/ExpenseForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useIncome } from '@/hooks/useIncome';
import { useClients } from '@/hooks/useClients';
import { useProjects } from '@/hooks/useProjects';
import type { Income, Expense } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { INCOME_TYPES, EXPENSE_CATEGORIES } from '@/lib/constants';

export function IncomePage() {
  const {
    income,
    expenses,
    loading,
    loadIncome,
    loadExpenses,
    createIncome,
    createExpense,
    deleteIncome,
    deleteExpense,
  } = useIncome();
  const { clients, loadClients } = useClients();
  const { projects, loadProjects } = useProjects();
  const [incomeFormOpen, setIncomeFormOpen] = useState(false);
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('income');

  useEffect(() => {
    loadIncome();
    loadExpenses();
    loadClients();
    loadProjects();
  }, [loadIncome, loadExpenses, loadClients, loadProjects]);

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const handleIncomeSubmit = async (data: Omit<Income, 'id' | 'createdAt'>) => {
    await createIncome(data);
    setIncomeFormOpen(false);
  };

  const handleExpenseSubmit = async (data: Omit<Expense, 'id' | 'createdAt'>) => {
    await createExpense(data);
    setExpenseFormOpen(false);
  };

  const handleDeleteIncome = async (id: number) => {
    if (confirm('Are you sure you want to delete this income entry?')) {
      await deleteIncome(id);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  const getIncomeTypeLabel = (type: string) => {
    return INCOME_TYPES.find((t) => t.value === type)?.label || type;
  };

  const getExpenseCategoryLabel = (category: string) => {
    return EXPENSE_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const getClientName = (clientId: number | null) => {
    if (!clientId) return null;
    return clients.find((c) => c.id === clientId)?.name;
  };

  return (
    <AppShell title="Income & Expenses">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-5 w-5 mr-1" />
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {income.length} entries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 flex items-center">
                <ArrowDownRight className="h-5 w-5 mr-1" />
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {expenses.length} entries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Net Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold flex items-center ${netIncome >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                <TrendingUp className="h-5 w-5 mr-1" />
                {formatCurrency(netIncome)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalIncome > 0 ? ((netIncome / totalIncome) * 100).toFixed(1) : 0}% profit margin
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <Button onClick={() => activeTab === 'income' ? setIncomeFormOpen(true) : setExpenseFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab === 'income' ? 'Income' : 'Expense'}
            </Button>
          </div>

          <TabsContent value="income">
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {loading ? (
                    <div className="p-4 space-y-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : income.length > 0 ? (
                    <div className="divide-y">
                      {income.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10">
                              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <p className="font-medium">{getIncomeTypeLabel(entry.type)}</p>
                              <p className="text-sm text-muted-foreground">
                                {getClientName(entry.clientId) || 'No client'} • {formatDate(entry.date, 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                              +{formatCurrency(entry.amount, entry.currency)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => entry.id && handleDeleteIncome(entry.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="text-4xl mb-4">💰</div>
                      <h3 className="text-lg font-semibold mb-2">No income yet</h3>
                      <p className="text-muted-foreground mb-4 max-w-sm">
                        Start tracking your income to see your earnings grow.
                      </p>
                      <Button onClick={() => setIncomeFormOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Income
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {loading ? (
                    <div className="p-4 space-y-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : expenses.length > 0 ? (
                    <div className="divide-y">
                      {expenses.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-500/10">
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">{getExpenseCategoryLabel(entry.category)}</p>
                              <p className="text-sm text-muted-foreground">
                                {entry.description} • {formatDate(entry.date, 'MMM dd, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-red-600 bg-red-50">
                              -{formatCurrency(entry.amount, entry.currency)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => entry.id && handleDeleteExpense(entry.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-lg font-semibold mb-2">No expenses yet</h3>
                      <p className="text-muted-foreground mb-4 max-w-sm">
                        Track your expenses to understand your spending habits.
                      </p>
                      <Button onClick={() => setExpenseFormOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Expense
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <IncomeForm
        open={incomeFormOpen}
        clients={clients}
        projects={projects}
        onOpenChange={setIncomeFormOpen}
        onSubmit={handleIncomeSubmit}
      />

      <ExpenseForm
        open={expenseFormOpen}
        onOpenChange={setExpenseFormOpen}
        onSubmit={handleExpenseSubmit}
      />
    </AppShell>
  );
}
