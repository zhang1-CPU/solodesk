import { useNavigate } from 'react-router-dom';
import { Plus, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickActionsProps {
  onStartTimer?: () => void;
  onAddClient?: () => void;
  onAddIncome?: () => void;
}

export function QuickActions({ onStartTimer, onAddClient, onAddIncome }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Client',
      icon: Users,
      onClick: onAddClient || (() => navigate('/clients')),
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Start Timer',
      icon: Clock,
      onClick: onStartTimer || (() => navigate('/time-tracker')),
      color: 'bg-emerald-500 hover:bg-emerald-600',
    },
    {
      label: 'Add Income',
      icon: DollarSign,
      onClick: onAddIncome || (() => navigate('/income')),
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      label: 'New Project',
      icon: Plus,
      onClick: () => navigate('/projects'),
      color: 'bg-amber-500 hover:bg-amber-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="default"
              className={`${action.color} h-auto flex flex-col items-center gap-2 py-4`}
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
