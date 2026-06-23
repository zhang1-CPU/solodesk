import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Clock,
  FolderKanban,
  Users,
  FileText,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/lib/db';
import { useUIStore } from '@/stores/uiStore';

const features = [
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Track billable hours with precision. Start, pause, and stop timers with ease.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: DollarSign,
    title: 'Income & Expenses',
    description: 'Monitor your cash flow. Record income and track business expenses.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Organize projects with kanban boards. Track progress and budgets.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'Client Management',
    description: 'Maintain client profiles with contact info, rates, and project history.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: FileText,
    title: 'Invoicing',
    description: 'Create professional invoices. Send and track payment status.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Visualize your business with charts and key performance metrics.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const addToast = useUIStore((state) => state.addToast);

  const createDemoData = async () => {
    try {
      const now = new Date();

      const clientColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

      const clientIds = await db.clients.bulkAdd([
        {
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          company: 'Acme Corp',
          phone: '+1-555-0101',
          address: '123 Main St, New York, NY',
          hourlyRate: 75,
          currency: 'USD',
          notes: 'Long-term client, monthly retainer.',
          color: clientColors[0],
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'TechStart Inc',
          email: 'hello@techstart.io',
          company: 'TechStart',
          phone: '+1-555-0102',
          address: '456 Oak Ave, San Francisco, CA',
          hourlyRate: 100,
          currency: 'USD',
          notes: 'Startup client, project-based work.',
          color: clientColors[1],
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Global Designs',
          email: 'info@globaldesigns.com',
          company: 'Global Designs Studio',
          phone: '+1-555-0103',
          address: '789 Pine Rd, Los Angeles, CA',
          hourlyRate: 85,
          currency: 'USD',
          notes: 'Design agency partnership.',
          color: clientColors[2],
          createdAt: now,
          updatedAt: now,
        },
      ]) as unknown as number[];

      const projectIds = await db.projects.bulkAdd([
        {
          clientId: clientIds[0],
          name: 'Website Redesign',
          description: 'Complete redesign of corporate website with modern UI/UX.',
          status: 'active',
          budget: 5000,
          currency: 'USD',
          startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          endDate: null,
          dueDate: new Date(now.getFullYear(), now.getMonth() + 2, 15),
          hourlyRate: 75,
          isBillable: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          clientId: clientIds[1],
          name: 'Mobile App Development',
          description: 'iOS and Android app with React Native.',
          status: 'active',
          budget: 12000,
          currency: 'USD',
          startDate: new Date(now.getFullYear(), now.getMonth() - 2, 15),
          endDate: null,
          dueDate: new Date(now.getFullYear(), now.getMonth() + 4, 1),
          hourlyRate: 100,
          isBillable: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          clientId: clientIds[2],
          name: 'Brand Identity Package',
          description: 'Logo, business cards, and brand guidelines.',
          status: 'completed',
          budget: 3000,
          currency: 'USD',
          startDate: new Date(now.getFullYear(), now.getMonth() - 3, 1),
          endDate: new Date(now.getFullYear(), now.getMonth() - 1, 15),
          dueDate: new Date(now.getFullYear(), now.getMonth() - 1, 15),
          hourlyRate: 85,
          isBillable: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          clientId: clientIds[0],
          name: 'Monthly Retainer - March',
          description: 'Monthly maintenance and support retainer.',
          status: 'invoiced',
          budget: 2000,
          currency: 'USD',
          startDate: new Date(now.getFullYear(), now.getMonth(), 1),
          endDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          hourlyRate: 75,
          isBillable: true,
          createdAt: now,
          updatedAt: now,
        },
      ]) as unknown as number[];

      await db.timeEntries.bulkAdd([
        {
          projectId: projectIds[0],
          description: 'Homepage design mockups',
          startTime: new Date(now.getFullYear(), now.getMonth(), 1, 9, 0),
          endTime: new Date(now.getFullYear(), now.getMonth(), 1, 12, 30),
          duration: 12600,
          isBillable: true,
          hourlyRate: 75,
          createdAt: now,
        },
        {
          projectId: projectIds[0],
          description: 'Responsive layout implementation',
          startTime: new Date(now.getFullYear(), now.getMonth(), 2, 10, 0),
          endTime: new Date(now.getFullYear(), now.getMonth(), 2, 15, 0),
          duration: 18000,
          isBillable: true,
          hourlyRate: 75,
          createdAt: now,
        },
        {
          projectId: projectIds[1],
          description: 'API integration',
          startTime: new Date(now.getFullYear(), now.getMonth(), 3, 9, 0),
          endTime: new Date(now.getFullYear(), now.getMonth(), 3, 13, 30),
          duration: 16200,
          isBillable: true,
          hourlyRate: 100,
          createdAt: now,
        },
        {
          projectId: projectIds[1],
          description: 'UI component development',
          startTime: new Date(now.getFullYear(), now.getMonth(), 4, 11, 0),
          endTime: new Date(now.getFullYear(), now.getMonth(), 4, 17, 0),
          duration: 21600,
          isBillable: true,
          hourlyRate: 100,
          createdAt: now,
        },
        {
          projectId: projectIds[2],
          description: 'Logo design concepts',
          startTime: new Date(now.getFullYear(), now.getMonth() - 2, 5, 9, 0),
          endTime: new Date(now.getFullYear(), now.getMonth() - 2, 5, 14, 0),
          duration: 18000,
          isBillable: true,
          hourlyRate: 85,
          createdAt: now,
        },
      ]);

      await db.income.bulkAdd([
        {
          projectId: projectIds[2],
          clientId: clientIds[2],
          amount: 3000,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth() - 1, 20),
          type: 'fixed',
          notes: 'Brand identity package - full payment',
          isTaxable: true,
          createdAt: now,
        },
        {
          projectId: null,
          clientId: clientIds[0],
          amount: 2000,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth(), 5),
          type: 'retainer',
          notes: 'Monthly retainer payment',
          isTaxable: true,
          createdAt: now,
        },
        {
          projectId: projectIds[1],
          clientId: clientIds[1],
          amount: 5000,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth() - 1, 10),
          type: 'hourly',
          notes: 'First milestone payment',
          isTaxable: true,
          createdAt: now,
        },
        {
          projectId: null,
          clientId: null,
          amount: 500,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth() - 1, 25),
          type: 'bonus',
          notes: 'Referral bonus',
          isTaxable: true,
          createdAt: now,
        },
      ]);

      await db.expenses.bulkAdd([
        {
          category: 'software',
          amount: 29,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth(), 1),
          description: 'Figma Professional subscription',
          isDeductible: true,
          receiptUrl: null,
          createdAt: now,
        },
        {
          category: 'software',
          amount: 12,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth(), 1),
          description: 'GitHub Pro subscription',
          isDeductible: true,
          receiptUrl: null,
          createdAt: now,
        },
        {
          category: 'marketing',
          amount: 200,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth() - 1, 15),
          description: 'LinkedIn advertising campaign',
          isDeductible: true,
          receiptUrl: null,
          createdAt: now,
        },
        {
          category: 'office',
          amount: 75,
          currency: 'USD',
          date: new Date(now.getFullYear(), now.getMonth() - 1, 20),
          description: 'Office supplies',
          isDeductible: true,
          receiptUrl: null,
          createdAt: now,
        },
      ]);

      await db.invoices.bulkAdd([
        {
          projectId: projectIds[3],
          clientId: clientIds[0],
          invoiceNumber: 'INV-2024-0001',
          issueDate: new Date(now.getFullYear(), now.getMonth(), 1),
          dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
          items: [
            { description: 'Monthly retainer services', quantity: 1, unitPrice: 2000, total: 2000 },
          ],
          subtotal: 2000,
          taxRate: 0,
          taxAmount: 0,
          total: 2000,
          currency: 'USD',
          status: 'sent',
          notes: 'Thank you for your continued business!',
          createdAt: now,
        },
        {
          projectId: projectIds[2],
          clientId: clientIds[2],
          invoiceNumber: 'INV-2024-0002',
          issueDate: new Date(now.getFullYear(), now.getMonth() - 2, 15),
          dueDate: new Date(now.getFullYear(), now.getMonth() - 1, 15),
          items: [
            { description: 'Brand identity package', quantity: 1, unitPrice: 3000, total: 3000 },
          ],
          subtotal: 3000,
          taxRate: 0,
          taxAmount: 0,
          total: 3000,
          currency: 'USD',
          status: 'paid',
          notes: 'Paid in full.',
          createdAt: now,
        },
      ]);

      addToast({
        title: 'Welcome!',
        description: 'Demo data has been created. Explore your dashboard!',
        variant: 'success',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create demo data:', error);
      addToast({
        title: 'Error',
        description: 'Failed to create demo data',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            All-in-one freelancer toolkit
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Freelancer <span className="text-primary">Command Center</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Manage clients, track time, send invoices, and grow your freelance business — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={createDemoData}>
              Get Started with Demo Data
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Shield className="h-5 w-5 mr-2" />
              Your data stays local
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`p-3 rounded-lg w-fit ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="border-0 bg-primary/5">
            <CardContent className="p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to take control of your freelance business?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Start with demo data to explore all features. All your data is stored locally in your browser.
              </p>
              <Button size="lg" onClick={createDemoData}>
                Start Exploring
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Freelancer Command Center • Built with React & TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
