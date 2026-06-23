import { UserPlus, Timer, FileText } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Add Clients',
    description: 'Create profiles for your clients with rates, contact info, and project history.',
  },
  {
    number: '2',
    icon: Timer,
    title: 'Track Time',
    description: 'Start a timer when you work. Pause, resume, and assign hours to specific projects.',
  },
  {
    number: '3',
    icon: FileText,
    title: 'Get Paid',
    description: 'Generate professional invoices and export your data for taxes or backups.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Three steps to take control of your freelance business.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}