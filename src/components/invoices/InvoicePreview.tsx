import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Invoice, Client } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { INVOICE_STATUS } from '@/lib/constants';

interface InvoicePreviewProps {
  open: boolean;
  invoice: Invoice | null;
  client?: Client;
  onClose: () => void;
}

export function InvoicePreview({ open, invoice, client, onClose }: InvoicePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!invoice) return null;

  const statusConfig = INVOICE_STATUS[invoice.status];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!contentRef.current) return;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Invoice Preview</DialogTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="bg-white p-8 rounded-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary">INVOICE</h1>
              <p className="text-sm text-gray-500 mt-1">#{invoice.invoiceNumber}</p>
            </div>
            <Badge variant="outline" className={statusConfig.color}>
              {statusConfig.label}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">From</p>
              <p className="font-medium">Your Company</p>
              <p className="text-sm text-gray-600">Your Address</p>
              <p className="text-sm text-gray-600">City, State ZIP</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Bill To</p>
              <p className="font-medium">{client?.name || 'Client Name'}</p>
              {client?.company && (
                <p className="text-sm text-gray-600">{client.company}</p>
              )}
              {client?.email && (
                <p className="text-sm text-gray-600">{client.email}</p>
              )}
              {client?.address && (
                <p className="text-sm text-gray-600">{client.address}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Issue Date</p>
              <p className="font-medium">{formatDate(invoice.issueDate, 'MMMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Due Date</p>
              <p className="font-medium">{formatDate(invoice.dueDate, 'MMMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
              <p className="font-bold text-lg">{formatCurrency(invoice.total, invoice.currency)}</p>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="text-center p-3 text-xs font-medium text-gray-500 uppercase w-20">Qty</th>
                    <th className="text-right p-3 text-xs font-medium text-gray-500 uppercase w-24">Rate</th>
                    <th className="text-right p-3 text-xs font-medium text-gray-500 uppercase w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        <p className="font-medium text-sm">{item.description}</p>
                      </td>
                      <td className="p-3 text-center text-sm">{item.quantity}</td>
                      <td className="p-3 text-right text-sm">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="p-3 text-right text-sm font-medium">
                        {formatCurrency(item.total, invoice.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                  <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-gray-400">Thank you for your business!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
