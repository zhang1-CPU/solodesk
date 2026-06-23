import { Mail, Phone, Building2, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Client } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ClientCardProps {
  client: Client;
  totalIncome?: number;
  onEdit?: (client: Client) => void;
  onDelete?: (id: number) => void;
  onClick?: (client: Client) => void;
}

export function ClientCard({ client, totalIncome = 0, onEdit, onDelete, onClick }: ClientCardProps) {
  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={() => onClick?.(client)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12" style={{ backgroundColor: client.color + '20' }}>
            <AvatarFallback style={{ color: client.color }}>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold leading-none">{client.name}</h3>
            {client.company && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 className="h-3 w-3" />
                {client.company}
              </p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(client); }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={(e) => { e.stopPropagation(); client.id && onDelete?.(client.id); }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {client.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>{client.phone}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            Rate: {formatCurrency(client.hourlyRate, client.currency)}/hr
          </Badge>
          {totalIncome > 0 && (
            <span className="text-sm font-medium text-emerald-600">
              {formatCurrency(totalIncome, client.currency)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
