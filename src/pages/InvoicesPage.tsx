import { useState, useEffect } from 'react';
import { Plus, Eye, FileText, Trash2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { InvoicePreview } from '@/components/invoices/InvoicePreview';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInvoices } from '@/hooks/useInvoices';
import { useClients } from '@/hooks/useClients';
import type { Invoice } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { INVOICE_STATUS } from '@/lib/constants';

export function InvoicesPage() {
  const { invoices, loading, loadInvoices, deleteInvoice, markAsPaid } = useInvoices();
  const { clients, loadClients } = useClients();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
    loadClients();
  }, [loadInvoices, loadClients]);

  const getClientName = (clientId: number) => {
    return clients.find((c) => c.id === clientId)?.name || 'Unknown Client';
  };

  const getClient = (clientId: number) => {
    return clients.find((c) => c.id === clientId);
  };

  const handlePreview = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPreviewOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoice(id);
    }
  };

  const handleMarkPaid = async (id: number) => {
    await markAsPaid(id);
  };

  return (
    <AppShell title="Invoices">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold">{invoices.length} invoices</span>
            </div>
          </div>
          <Button onClick={() => {}}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {loading ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : invoices.length > 0 ? (
                <div className="divide-y">
                  {invoices.map((invoice) => {
                    const statusConfig = INVOICE_STATUS[invoice.status];
                    return (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{invoice.invoiceNumber}</p>
                              <Badge variant="outline" className={statusConfig.color}>
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {getClientName(invoice.clientId)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Issued: {formatDate(invoice.issueDate, 'MMM dd, yyyy')} • Due: {formatDate(invoice.dueDate, 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">
                            {formatCurrency(invoice.total, invoice.currency)}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handlePreview(invoice)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              {invoice.status !== 'paid' && (
                                <DropdownMenuItem onClick={() => invoice.id && handleMarkPaid(invoice.id)}>
                                  Mark as Paid
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => invoice.id && handleDelete(invoice.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Create professional invoices for your clients and track payments.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Invoice
                  </Button>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <InvoicePreview
        open={previewOpen}
        invoice={selectedInvoice}
        client={selectedInvoice ? getClient(selectedInvoice.clientId) : undefined}
        onClose={() => setPreviewOpen(false)}
      />
    </AppShell>
  );
}
