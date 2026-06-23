import { X, Mail, Phone, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Client } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ClientDetailProps {
  client: Client | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  totalIncome?: number;
  projectCount?: number;
}

export function ClientDetail({ client, open, onClose, onEdit, totalIncome = 0, projectCount = 0 }: ClientDetailProps) {
  if (!client) return null;

  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l bg-card shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100%-64px)]">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20" style={{ backgroundColor: client.color + '20' }}>
                <AvatarFallback
                  className="text-2xl font-semibold"
                  style={{ color: client.color }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">{client.name}</h3>
              {client.company && (
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <Building2 className="h-4 w-4" />
                  {client.company}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold">{projectCount}</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(totalIncome, client.currency)}
                </p>
                <p className="text-xs text-muted-foreground">Total Income</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Contact Information</h4>

              {client.email && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">{client.email}</p>
                  </div>
                </div>
              )}

              {client.phone && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Phone className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">{client.phone}</p>
                  </div>
                </div>
              )}

              {client.address && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MapPin className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">{client.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  <p className="text-sm">{formatCurrency(client.hourlyRate, client.currency)}/hr</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{client.currency}</Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Added {formatDate(client.createdAt, 'MMM dd, yyyy')}
                </div>
              </div>
            </div>

            {client.notes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {client.notes}
                  </p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-card p-4">
          <Button className="w-full" onClick={onEdit}>
            Edit Client
          </Button>
        </div>
      </div>
    </>
  );
}
